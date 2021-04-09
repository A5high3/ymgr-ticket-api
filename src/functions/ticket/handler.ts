import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse, formatErrorJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as Service from "../../service";
import schema from "./schema";

const ticket: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    console.log("チケットツイート取得API START", event);
    if (!event.headers.origin) {
      throw new Error("Invalid Request");
    }

    const requestBody = Service.Validator.requestValidate(event as any);

    const result = [];
    for (const castId of requestBody.requestIds) {
      const twitterId = Service.CastTwitterBase[`cast_id_${castId}`].twitterId;
      const getResult = await Service.TwitterApi.getLatest100TweetObject(
        twitterId
      );
      result.push(getResult);
    }

    console.log("チケットツイート取得API END", result);
    return formatJSONResponse(
      {
        message: `success`,
        content: result,
      },
      event.headers.origin
    );
  } catch (e) {
    console.error(e, event);
    return formatErrorJSONResponse({ message: "error" });
  }
};

export const main = middyfy(ticket);
