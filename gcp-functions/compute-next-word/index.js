const ComputeNextWordHandler = require('./handler.js');

exports.computeNextWord = (req, res) => {
  const handler = new ComputeNextWordHandler();

  const response = handler.handle({ session: req.body });

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(response, null, 2));
};