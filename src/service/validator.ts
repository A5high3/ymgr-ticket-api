import { APIGatewayProxyEvent } from "aws-lambda";
import { TicketInfoRequest } from "../models/apigatewayRequests";

export class Validator {
  public static requestValidate(event: APIGatewayProxyEvent) {
    try {
      const requestBody = JSON.parse(event.body) as TicketInfoRequest;
      if (requestBody.requestIds.length === 0) {
        throw new Error("RequestIds Empty");
      }
      if (3 < requestBody.requestIds.length) {
        throw new Error("RequestIds Limit Over");
      }
      if (!requestBody.requestIds.every((id) => +id < 43)) {
        throw new Error("Invalid RequestIds");
      }
      if (requestBody.requestIds.includes("6")) {
        throw new Error("Invalid RequestIds");
      }
      if (requestBody.requestIds.includes("7")) {
        throw new Error("Invalid RequestIds");
      }
      if (requestBody.requestIds.includes("8")) {
        throw new Error("Invalid RequestIds");
      }
      return requestBody;
    } catch (e) {
      throw e;
    }
  }
}
