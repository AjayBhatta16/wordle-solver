package myfunction

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"slices"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/google/uuid"

	_ "embed"
)

//go:embed default-session.json
var defaultSessionJSON []byte

func GetSession(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	ctx := context.Background()
	dbClient, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		http.Error(w, "Failed to create Firestore client:"+err.Error(), http.StatusInternalServerError)
		return
	}

	defer dbClient.Close()

	sessionID := GetSessionID(r.URL.Path)

	if sessionID == "" {
		session := GetDefaultSession()

		session = saveSession(dbClient, session)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
	} else {
		session, err := GetSessionByID(dbClient, sessionID)

		if err != nil {
			http.Error(w, "Session "+sessionID+" not found: "+err.Error(), http.StatusNotFound)
			return
		}

		session.LastUpdatedTimeStamp = time.Now().UnixMilli()

		session = updateSession(dbClient, session, session.firestoreID)

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(session)
	}
}

func GetSessionID(url string) string {
	tokens := strings.Split(url, "/")
	slices.Reverse(tokens)
	lastToken := tokens[0]

	if lastToken == "get-session" || lastToken == "get-session/" {
		return ""
	}

	return lastToken
}

func GetDefaultSession() Session {
	var session Session
	json.Unmarshal(defaultSessionJSON, &session)

	session.LastUpdatedTimeStamp = time.Now().UnixMilli()
	session.SessionId = uuid.NewString()

	return session
}

func saveSession(client *firestore.Client, session Session) Session {
	ctx := context.Background()

	_, _, err := client.Collection("sessions").Add(ctx, session)

	if err != nil {
		log.Println("GETSESSION - Firestore write error", http.StatusInternalServerError)
		return Session{}
	}

	return session
}

func updateSession(client *firestore.Client, session Session, firestoreID string) Session {
	ctx := context.Background()
	_, err := client.Collection("sessions").Doc(firestoreID).Set(ctx, session)

	if err != nil {
		log.Println("GETSESSION - Firestore update error", http.StatusInternalServerError)
		return Session{}
	}

	return session
}

func GetSessionByID(client *firestore.Client, sessionID string) (Session, error) {
	ctx := context.Background()
	iter := client.Collection("sessions").Where("sessionId", "==", sessionID).Limit(1).Documents(ctx)
	doc, err := iter.Next()

	if err != nil {
		log.Println("GETSESSION - Error getting session:", err)
		return Session{}, err
	}

	var session Session
	if err := doc.DataTo(&session); err != nil {
		log.Println("GETSESSION - Error decoding session data:", err)
		return Session{}, err
	}

	session.firestoreID = doc.Ref.ID
	session.LastUpdatedTimeStamp = time.Now().UnixMilli()

	return session, nil
}
