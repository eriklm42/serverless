export const endpoints = {
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
