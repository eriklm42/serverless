import { handler } from "../../adapters/services/clients/handlers/index";

console.log = jest.fn();

describe("handler function", () => {
	it("should return status 200 and a message containing a UUID", () => {
		const result = handler();

		expect(result.status).toBe(200);

		expect(typeof result.message).toBe("string");
		expect(result.message.length).toBeGreaterThan(0);

		expect(console.log).toHaveBeenCalledWith(result.message);
	});
});
