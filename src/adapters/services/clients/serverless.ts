import BaseServerless from "../../../config/serverless";
import { routes } from "./routes"

const configServiceTest = {
	...BaseServerless,
	service: "clients",
	custom: {
		"serverless-offline": {
			...BaseServerless["serverless-offline"],
			httpPort: 3000,
			lambdaPort: 3001,
		},
	},
	functions: routes,
};

export default configServiceTest
