import { randomUUID } from "crypto";

export const handler = () => {
	const test = randomUUID();

	console.log(test);

	return {
		status: 200,
		message: test,
	};
};
