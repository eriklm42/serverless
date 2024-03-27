
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
};

export default baseServerlessConfig