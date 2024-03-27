import BaseServerless from "../../../config/serverless";
import { routes } from "./routes";

module.exports = {
	...BaseServerless,
	service: "serv-clients",
	custom: {
		...BaseServerless.custom,
		"serverless-offline": {
			...BaseServerless.custom["serverless-offline"],
			httpPort: 3000,
			lambdaPort: 3001,
		},
	},
	functions: routes,
};
