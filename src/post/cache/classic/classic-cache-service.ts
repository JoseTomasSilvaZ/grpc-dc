import { Post } from "@prisma/client";
import Redis, { Redis as RedisClient } from "ioredis";




export class ClassicCacheService {
    private redisClient: RedisClient

    constructor(){
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: 6379
        })
    }

    async getPost(id: number): Promise<{id:number, text:string}>{
        const post = await this.redisClient.get(`post:${id}`)
        return post ? JSON.parse(post) : null
    }

    async setPost(post: Post): Promise<void>{
        await this.redisClient.set(`post:${post.id}`, JSON.stringify(post), 'EX', 3600)
    }
}