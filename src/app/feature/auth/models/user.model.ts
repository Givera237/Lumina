export interface User
{
    "name": string,
    "password": string,
    "email": string,
    "role": null | 'creator' | 'SUBSCRIBER'
    "googleId": number,
    "avatar": string
}