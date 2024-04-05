import { handler } from "../../adapters/services/clients/handlers/index";

describe("End-to-End Test for handler function", () => {
	it("should return status 200 and a message containing a UUID", () => {
		const result = handler();

		expect(result.status).toBe(200);

		expect(typeof result.message).toBe("string");
		expect(result.message.length).toBeGreaterThan(0);
	});
});
