package myfunction

import (
	"context"
	"log"
)

type PubSubMessage struct {
	Data []byte `json:"data"`
}

func CleanupTimer(ctx context.Context, m PubSubMessage) error {
	log.Println("CleanupTimer - CI/CD pipeline succeeded")

	return nil
}