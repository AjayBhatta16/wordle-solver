gcloud functions deploy cleanup-timer \
  --gen2 \
  --runtime=go123 \
  --region=us-east4 \
  --entry-point=CleanupTimer \
  --trigger-topic=cleanup-timer