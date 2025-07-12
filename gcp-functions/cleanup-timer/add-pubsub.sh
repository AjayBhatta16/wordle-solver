gcloud scheduler jobs create pubsub daily-job \
  --schedule="0 6 * * *" \
  --topic=cleanup-timer \
  --message-body="{}" \
  --time-zone="America/New_York" \
  --location=us-east4