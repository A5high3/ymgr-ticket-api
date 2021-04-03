export interface TwitterTimeLineAPIResponse {
    data: TweetObject[],
    includes: {
        users: UserObject[]
    }
}

export interface TweetObject {
    id: string
    text: string,
    author_id: string,
    created_at: string // ISO string
}

export interface UserObject {
    id: string
    name: string,
    username: string,
    profile_image_url: string,
}