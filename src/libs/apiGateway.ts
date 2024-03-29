import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  response: Record<string, unknown>,
  origin: string
) => {
  const allowOrigins = [
    "https://yumegra-ticketinfo.com",
    "http://localhost:3000",
  ];
  if (allowOrigins.includes(origin)) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
      },
      body: JSON.stringify(response),
    };
  } else {
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(response),
    };
  }
};

export const formatErrorJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(response),
  };
};
