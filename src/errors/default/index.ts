import { StackError } from "../stacks";

export type codeType =
	| "ERRNULL"
	| "EACCS001"
	| "EACCS002"
	| "EBADD001"
	| "EDATA001"
	| "ESERV000"

export class DefaultError extends StackError {
	code?: codeType;
	headers?: Record<string, string>;

	constructor({
		message,
		code,
		status = 400,
		headers = undefined,
	}: {
		message: string;
		code: codeType;
		status?: number;
		headers?: Record<string, string>;
	}) {
		super({ message, status });
		this.code = code;
		this.status = status;
		this.headers = headers;
	}

	toHttpResponse() {
		return {
			body: {
				code: this.code,
				message: this.message,
			},
			statusCode: this.status,
			headers: this.headers,
		};
	}
}
