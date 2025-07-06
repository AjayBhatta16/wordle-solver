gcloud functions deploy get-next-word \
  --gen2 \
  --region=us-east4 \
  --runtime=go123 \
  --source=. \
  --entry-point=GetNextWord \
  --trigger-http \
  --allow-unauthenticated