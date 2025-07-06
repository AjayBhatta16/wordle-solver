gcloud functions deploy compute-next-word \
  --gen2 \
  --runtime=nodejs22 \
  --region=us-east4 \
  --entry-point=computeNextWord \
  --trigger-http \
  --allow-unauthenticated