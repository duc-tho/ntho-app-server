class PaginationMiddleware {
  index(request, reply, next) {
    let limit = 20;
    let page = 1;

    if (request.query) {
      limit = request.query.l ?? limit;
      page = request.query.p ?? page;
    }

    request.pagination = {
      limit,
      offset: (page - 1) * limit
    }

    next();
  }
}

exports.PaginationMiddleware = new PaginationMiddleware();