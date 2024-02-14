import { endpoints } from "./endpoints";

module.exports = {
	service: "test",
	provider: {
		name: "aws",
		runtime: "nodejs20.x",
		stage: "dev",
		region: "us-east-1",
		environment: {
			VARIABLE_ONE: "value_one",
			VARIABLE_TWO: "value_two",
		},
	},
	plugins: ["serverless-offline"],
	package: {
		excludeDevDependencies: true,
	},
	custom: {
		"serverless-offline": {
			noPrependStageInUrl: true,
			httpPort: 3000,
			lambdaPort: 3001,
		},
	},
	functions: endpoints,
};
