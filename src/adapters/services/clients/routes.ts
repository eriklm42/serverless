export const routes = {
	test: {
		handler: "handler.main",
		events: [
			{
				http: {
					path: "hello",
					method: "get",
				},
			},
		],
	},
};
