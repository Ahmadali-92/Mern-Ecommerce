module.exports = (ErrorCatch) => (req, res, next) => {
  Promise.resolve(ErrorCatch(req, res, next)).catch(next);
};
//try catch method ki jaga(productController k ander)