const baseServerlessConfig = {
	provider: {
		name: "aws",
		runtime: "nodejs20.x",
		stage: "dev",
		region: "sa-east-1",
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
		},
	},
	resources: {
		Resources: {
			GrafanaDashboard: {
				Type: "AWS::ApiGateway::Resource",
				Properties: {
					RestApiId: {
						Ref: "ApiGatewayRestApi",
					},
					ParentId: {
						"Fn::GetAtt": ["ApiGatewayRestApi", "RootResourceId"],
					},
					PathPart: "grafana",
				},
			},
		},
	},
};

export default baseServerlessConfig;
