export default (networkInterface, token) => networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers.authorization = token ? `Bearer ${token}` : '';
    next();
  },
}]);
