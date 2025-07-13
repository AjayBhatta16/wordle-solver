const ComputeNextWordHandler = require('./handler.js');

exports.computeNextWord = (req, res) => {
  const handler = new ComputeNextWordHandler();

  const handlerRequest = JSON.parse(req.body ?? '{}');

  const response = handler.handle(handlerRequest);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(response, null, 2));
};