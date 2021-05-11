import * as axios from "axios";
import {  TwitterTimeLineAPIResponse } from "../models/httpRequests";
import { ParseTwiTlApiRespose } from "../models/parse"

export class TwitterApi {
  // NOTE: Twitter Timeline API References
  // https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets#tab3
  public static async getLatest100TweetObject(requestTwitterId: string) {
    const url = this.generateTwitterTimeLineApiUrl(requestTwitterId)
    const result = await axios.default.get(
      url,
      {
        headers: {
          Authorization:
            `Bearer ${process.env["TWITTER_API_TOKEN"]}`,
        },
      }
    );
    console.log("axios", result);
    console.log("Twitter Timeline API RESULT", result.data);
    const parsedResponse = this.parseTwiTlApiResponse(result.data)
    return parsedResponse
  }

  private static generateTwitterTimeLineApiUrl(requestTwitterId: string) {
    const maxResults = this.queryStringMaxResults()
    const exclude = this.queryStringExclude()
    const tweetFields = this.queryStringTweetFields()
    const expansion = this.queryStringExpansion()
    const userFields = this.queryStringUserFields()
    
    const requestUrl = `https://api.twitter.com/2/users/${requestTwitterId}/tweets?${maxResults}&${exclude}&${tweetFields}&${expansion}&${userFields}`
    return requestUrl
  }

  private static queryStringMaxResults() {
    return "max_results=100"
  }
  private static queryStringExclude() {
    return "exclude=retweets,replies";
  }
  private static queryStringTweetFields() {
    return "tweet.fields=created_at";
  }
  private static queryStringExpansion() {
    return "expansions=author_id";
  }
  private static queryStringUserFields() {
    return "user.fields=profile_image_url";
  }

  public static parseTwiTlApiResponse(apiResponse: TwitterTimeLineAPIResponse): ParseTwiTlApiRespose {
    const filteringTweets = apiResponse.data.filter(
      (tweetObject) => {
        if (tweetObject.text.includes("チケット")){
          return true
        }
        if (tweetObject.text.includes("チケ")){
          return true
        }
        if (tweetObject.text.includes("ﾁｹｯﾄ")){
          return true
        }
        if (tweetObject.text.includes("ﾁｹ")){
          return true
        }
        return false
      }
    );
    const shaped = filteringTweets.map(tweet=>{
      delete tweet.author_id
      return tweet
    })
    const parsed = {
      tweets: shaped,
      cast: apiResponse.includes.users[0]
    }
    console.log("parsed", parsed)
    return parsed
  }
}
