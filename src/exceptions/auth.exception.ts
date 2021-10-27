import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthException extends HttpException {
    errors;

    constructor(status, message, errors = []) {
        super(message, status);
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AuthException(HttpStatus.UNAUTHORIZED, 'User is not logged in');
    }

    static BadRequest(message, errors = []) {
        return new AuthException(HttpStatus.BAD_REQUEST, message, errors);
    }

    static Forbidden() {
        return new AuthException(HttpStatus.FORBIDDEN, "This column is not belong to this user")
    }
}