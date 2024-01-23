export class StackError extends Error {
	status: number; 
	constructor({ message, status }: { message: string; status: number }) {
		super(message);
		this.status = status;
		this.name = this.constructor.name;
		if (typeof Error.captureStackTrace === "function") {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}
}

export class PermissionStackError extends StackError {}
export class LoginStackError extends StackError {}
export class TokenStackError extends StackError {}
export class DatabaseStackError extends StackError {}

export type StackErrorType =
	| "PermissionStackError"
	| "LoginStackError"
	| "BadRequestError"
	| "DatabaseStackError";
