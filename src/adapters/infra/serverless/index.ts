import * as path from "path";

const stage = "dev";

const fetchEnvironment = async () => {
	const getEnvironmentVariables = require("../envs/getEnvs");
	try {
		const environment = await getEnvironmentVariables({
			secret_id: `${stage}/contaxip/serverless`,
			region: "sa-east-1",
			stage,
		});
		return environment;
	} catch (error) {
		console.log("Error getting environment variables:", error);
		throw error;
	}
};

module.exports = fetchEnvironment()
	.then((environment) => ({
		provider: {
			name: "aws",
			runtime: "nodejs16.x",
			stage: stage,
			region: "sa-east-1",
			environment: environment,
			timeout: 120,
			iamRoleStatements: [
				{
					Effect: "Allow",
					Action: ["lambda:InvokeFunction"],
					Resource: "*",
				},
			],
			apiGateway: {
				shouldStartNameWithService: true,
			},
		},
		package: {
			individually: true,
			exclude: ["./git/**"],
		},
		custom: {
			"serverless-offline": {
				noPrependStageInUrl: true,
			},
			webpack: {
				packager: "yarn",
				webpackConfig: path.relative(
					process.cwd(),
					path.join(__dirname, "webpack.config.js"),
				),
				includeModules: {
					forceExclude: ["aws-sdk"],
				},
			},
			apigwBinary: {
				types: [
					"application/*",
					"audio/*",
					"font/*",
					"image/*",
					"multipart/*",
					"text/*",
					"video/*",
				],
			},
			prune: {
				automatic: true,
				number: 10,
			},
		},
		plugins: [
			"serverless-webpack",
			"serverless-offline",
			"serverless-prune-plugin",
		],
	}))
	.catch((error) => console.log("error get environments: ", error));
