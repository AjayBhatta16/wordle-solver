gcloud functions deploy get-next-word \
  --gen2 \
  --region=us-east4 \
  --runtime=go123 \
  --source=. \
  --entry-point=GetNextWord \
  --trigger-http \
  --set-env-vars PROJECT_ID=$GCP_PROJECT_NAME,BASE_URI=$BASE_URI \
  --allow-unauthenticated