import Cloudflare from "cloudflare";
import 'dotenv/config'


export const cf = new Cloudflare({
    apiEmail: process.env.CLOUDFLARE_EMAIL,
    apiToken: process.env.CLOUDFLARE_API_TOKEN
})