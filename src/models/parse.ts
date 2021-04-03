import { TweetObject, UserObject } from "./httpRequests";

export interface ParseTwiTlApiRespose {
  tweets: TweetObject[];
  cast: UserObject;
}
