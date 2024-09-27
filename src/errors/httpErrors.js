const URLShortnerError = require("./baseError");
const { StatusCodes } = require("http-status-codes");

export class NotFoundError extends URLShortnerError {
	constructor(specificMessage) {
		super(StatusCodes.NOT_FOUND, "Not found error", specificMessage);
	}
}
export class UnauthorizedError extends URLShortnerError {
	constructor(specificMessage) {
		super(StatusCodes.UNAUTHORIZED, "Unauthorized Error", specificMessage);
	}
}
export class ValidationError extends URLShortnerError {
	constructor(specificMessage) {
		super(StatusCodes.BAD_REQUEST, "Validation Error", specificMessage);
	}
}
