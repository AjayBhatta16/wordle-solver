gcloud functions deploy get-session \
  --gen2 \
  --region=us-east4 \
  --runtime=go123 \
  --source=. \
  --entry-point=GetSession \
  --trigger-http \
  --allow-unauthenticated