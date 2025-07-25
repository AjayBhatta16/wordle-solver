package myfunction

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
)

func GetNextWord(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, x-requested-with")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	var dbClient = getDBClient()

	if dbClient == nil {
		http.Error(w, "Failed to create Firestore client", http.StatusInternalServerError)
	}

	defer dbClient.Close()

	var session, err = getSessionFromRequestBody(r)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	nextWord := commonSolutionSearch(session)

	if strings.EqualFold(nextWord, "") {
		nextWord = computeNextWord(session)
	} else {
		for _, word := range session.NotWords {
			if strings.EqualFold(strings.ToLower(nextWord), strings.ToLower(word)) {
				nextWord = computeNextWord(session)
				break
			}
		}
	}

	session.GuessSequence = append(session.GuessSequence, nextWord)
	session.LastUpdatedTimeStamp = time.Now().UnixMilli()

	session = updateSession(dbClient, session)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(session)
}

func getDBClient() *firestore.Client {
	ctx := context.Background()
	dbClient, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		return nil
	}

	return dbClient
}

func getSessionFromRequestBody(r *http.Request) (Session, error) {
	var session Session
	err := json.NewDecoder(r.Body).Decode(&session)

	if err != nil {
		log.Println("GETNEXTWORD - Error decoding request body:", err)
		return Session{}, err
	}

	return session, nil
}

func commonSolutionSearch(session Session) string {
	solutionKey := strings.ToLower(
		strings.Join(session.GuessSequence, "-") + "-" + session.LastGuessFeedback,
	)

	log.Println("GETNEXTWORD - Searching for common solution with key:", solutionKey)

	res, err := http.Get(os.Getenv("BASE_URI") + "/common-solution-search?key=" + solutionKey)

	if err != nil {
		log.Println("GETNEXTWORD - Error fetching common solution:", err)
		return ""
	}

	defer res.Body.Close()

	var solution CommonSolution
	json.NewDecoder(res.Body).Decode(&solution)

	log.Println("GETNEXTWORD - common solution search response:", solution.SolutionValue)

	return solution.SolutionValue
}

func computeNextWord(session Session) string {
	body, _ := json.Marshal(session)

	res, err := http.Post(
		os.Getenv("BASE_URI")+"/compute-next-word",
		"application/json",
		strings.NewReader(string(body)),
	)

	if err != nil {
		log.Println("COMPUTENEXTWORD - Error posting to compute-next-word:", err)
		return ""
	}

	defer res.Body.Close()

	var result ComputeResult
	json.NewDecoder(res.Body).Decode(&result)

	return result.BestWord
}

func updateSession(client *firestore.Client, session Session) Session {
	ctx := context.Background()

	log.Println("GETNEXTWORD - Updating session in Firestore with sessionId:", session.SessionId)

	iter := client.Collection("sessions").Where("sessionId", "==", session.SessionId).Limit(1).Documents(ctx)
	doc, err := iter.Next()

	if err != nil {
		log.Println("GETNEXTWORD - error retrieving existing session:", err)
		log.Println("GETNEXTWORD - Firestore update error", http.StatusNotFound)
		return Session{}
	}

	log.Println("GETNEXTWORD - Updating Firestore document with ID:", doc.Ref.ID)

	_, err = client.Collection("sessions").Doc(doc.Ref.ID).Set(ctx, session)

	if err != nil {
		log.Println("GETNEXTWORD - Firestore update error", http.StatusInternalServerError)
		return Session{}
	}

	return session
}
