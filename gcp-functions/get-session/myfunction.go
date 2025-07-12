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
		fmt.Fprintf(w, "GetSession - %s", sessionID)
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

	_, _, err := client.Collection("your-collection").Add(ctx, map[string]interface{}{
		"hello": "world",
	})

	if err != nil {
		fmt.Println("Firestore write error", http.StatusInternalServerError)
		return Session{}
	}

	return session
}
