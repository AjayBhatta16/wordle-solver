gcloud functions deploy common-solution-search \
  --gen2 \
  --region=us-east4 \
  --runtime=go123 \
  --source=. \
  --entry-point=CommonSolutionSearch \
  --trigger-http \
  --allow-unauthenticated