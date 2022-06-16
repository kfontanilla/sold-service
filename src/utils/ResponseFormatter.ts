const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('src/domain/Errors')

class ResponseFormatter {
  success(response: any, body: object) {
    response.status(200).send({
      success: true,
      results: body,
    })
  }

  error(response: any, statusCode: number, body: string) {
    response.status(statusCode).send({
      success: false,
      error: body,
    })
  }

  badRequest(response: any) {
    return this.error(response, 400, BAD_REQUEST)
  }

  internalServerError(response: any) {
    return this.error(response, 500, INTERNAL_SERVER_ERROR)
  }
}

module.exports = ResponseFormatter
