package myfunction

import (
	"context"
	"log"
	"os"
	"time"

	"cloud.google.com/go/firestore"
)

type PubSubMessage struct {
	Data []byte `json:"data"`
}

func CleanupTimer(ctx context.Context, m PubSubMessage) error {
	log.Println("CleanupTimer - start")

	dbClient := getDBClient()

	defer dbClient.Close()

	expiredSessions := getExpiredDocRefIDs(dbClient)

	for _, docID := range expiredSessions {
		err := deleteFirestoreDoc(dbClient, docID)
		if err != nil {
			log.Printf("CleanupTimer - Error deleting document %s: %v", docID, err)
		} else {
			log.Printf("CleanupTimer - Successfully deleted document %s", docID)
		}
	}

	return nil
}

func getDBClient() *firestore.Client {
	ctx := context.Background()
	dbClient, err := firestore.NewClient(ctx, os.Getenv("PROJECT_ID"))

	if err != nil {
		log.Println("getDBClient - Error creating Firestore client:", err)
		return nil
	}

	return dbClient
}

func getExpiredDocRefIDs(dbClient *firestore.Client) []string {
	ctx := context.Background()

	minTimestamp := time.Now().AddDate(0, 0, -7).UnixMilli()

	iter := dbClient.Collection("sessions").Where("lastUpdatedTimeStamp", "<", minTimestamp).Documents(ctx)

	var docIDs []string

	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		docIDs = append(docIDs, doc.Ref.ID)
	}

	return docIDs
}

func deleteFirestoreDoc(dbClient *firestore.Client, docID string) error {
	ctx := context.Background()
	_, err := dbClient.Collection("sessions").Doc(docID).Delete(ctx)
	if err != nil {
		log.Printf("deleteFirestoreDoc - Error deleting document %s: %v", docID, err)
		return err
	}
	log.Printf("deleteFirestoreDoc - Successfully deleted document %s", docID)
	return nil
}
