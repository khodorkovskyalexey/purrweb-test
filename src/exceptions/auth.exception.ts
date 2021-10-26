import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthException extends HttpException {
    errors;

    constructor(status, message, errors = []) {
        super(message, status);
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AuthException(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new AuthException(400, message, errors);
    }
}