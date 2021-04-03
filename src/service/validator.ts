import { APIGatewayProxyEvent } from "aws-lambda";
import { TicketInfoRequest} from "../models/apigatewayRequests"

export class Validator {
    public static requestValidate(event: APIGatewayProxyEvent) {
        try {
            const requestBody = JSON.parse(event.body) as TicketInfoRequest
            if(requestBody.requestIds.length === 0) {
                throw new Error("RequestIds Empty")
            }
            if(3 < requestBody.requestIds.length) {
                throw new Error("RequestIds Limit Over")
            }
            return requestBody
        }catch(e){
            throw e
        }
    }
}