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
		alerts: {
			stages: ["dev", "prod"],
			alarms: [
				"functionErrors",
				"functionThrottles",
				"functionInvocations",
				"functionDuration",
			],
			dashboards: true,
			topics: {
				alarm: {
					topic: "arn:aws:sns:sa-east-1:273670557987:lambda-alarms",
				},
			},
		},
		prune: {
			automatic: true,
			number: 10,
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
