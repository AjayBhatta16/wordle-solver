package myfunction

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"slices"
	"strings"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/google/uuid"
)

func GetSession(w http.ResponseWriter, r *http.Request) {
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
			http.Error(w, "Session not found: "+err.Error(), http.StatusNotFound)
			return
		}

		session.LastUpdatedTimeStamp = time.Now().UnixMilli()

		session = saveSession(dbClient, session)

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
	file, err := os.Open("default-session.json")
	if err != nil {
		fmt.Println("Error opening default session file:", err)
		return Session{}
	}
	defer file.Close()

	var session Session
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&session); err != nil {
		fmt.Println("Error decoding default session:", err)
		return Session{}
	}

	session.LastUpdatedTimeStamp = time.Now().UnixMilli()
	session.SessionId = uuid.NewString()

	return session
}

func saveSession(client *firestore.Client, session Session) Session {
	ctx := context.Background()

	_, _, err := client.Collection("sessions").Add(ctx, session)

	if err != nil {
		fmt.Println("Firestore write error", http.StatusInternalServerError)
		return Session{}
	}

	return session
}

func GetSessionByID(client *firestore.Client, sessionID string) (Session, error) {
	ctx := context.Background()
	iter := client.Collection("sessions").Where("sessionId", "==", sessionID).Limit(1).Documents(ctx)
	doc, err := iter.Next()

	if err != nil {
		fmt.Println("Error getting session:", err)
		return Session{}, err
	}

	var session Session
	if err := doc.DataTo(&session); err != nil {
		fmt.Println("Error decoding session data:", err)
		return Session{}, err
	}

	session.SessionId = doc.Ref.ID
	session.LastUpdatedTimeStamp = time.Now().UnixMilli()

	return session, nil
}
