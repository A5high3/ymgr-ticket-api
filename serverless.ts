import type { AWS } from "@serverless/typescript";

import ticket from "@functions/ticket";

const serverlessConfiguration: AWS = {
  service: "ymgr-ticket-api",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      TWITTER_API_TOKEN:
        "AAAAAAAAAAAAAAAAAAAAAFB6NgEAAAAAOAs255aIs9EBeYjupl3gUduKCmA%3DrDKzxIjIh7kxblYBxVt2AavNvJvn5SYpDZv9Ox9JbucKNzIait",
    },
    lambdaHashingVersion: "20201221",
  },
  // resources: {
  //   Resources: {
  //     accessLogTable: {
  //       Type: "AWS::DynamoDB::Table",
  //       Properties: {
  //         TableName: "accessLogTable",
  //         AttributeDefinitions: [
  //           {
  //             AttributeName: "request_id",
  //             AttributeType: "S",
  //           },
  //           {
  //             AttributeName: "date",
  //             AttributeType: "S",
  //           },
  //         ],
  //         KeySchema: [
  //           {
  //             KeyType: "HASH",
  //             AttributeName: "request_id",
  //           },
  //           {
  //             KeyType: "RANGE",
  //             AttributeName: "",
  //           },
  //         ],
  //         ProvisionedThroughput: {
  //           ReadCapacityUnits: 5,
  //           WriteCapacityUnits: 5,
  //         },
  //       },
  //     },
  //   },
  // },
  functions: { ticket },
};

module.exports = serverlessConfiguration;
