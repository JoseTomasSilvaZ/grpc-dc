


import { Injectable } from '@nestjs/common';
import { Research } from "@prisma/client";
import Redis from "ioredis";

@Injectable()
export class PartitionedCacheService {
    private cluster: any;
    constructor() {
        const nodes = [
            // {host: "173.18.0.10", port: 6379},  
            // {host: "173.18.0.11", port: 6380}, 
            // {host: "173.18.0.12", port: 6381},
            {host: "redis_1", port: 6379},  
            {host: "redis_2", port: 6380}, 
            {host: "redis_3", port: 6381},
        ];
        this.cluster = new Redis.Cluster(nodes, {
            scaleReads: 'slave',
            enableAutoPipelining: true,
            slotsRefreshTimeout: 100000
        });
     
    }
    async getPost(id: number): Promise<Research | null> {
        console.log("Getting post from Redis", id);
        try {
            const post = await this.cluster.get(`post:${id}`);
            console.log(`Post ${id} retrieved from Redis`)
            return post ? JSON.parse(post) : null;
        } catch (error) {
            console.error("Error retrieving post from Redis:", error);
            return null;
        }
        return null
    }

    async setPost(post: Research): Promise<void> {
        if (!post || post.id === undefined) {
            console.error("Invalid post data; cannot save to Redis.");
            return;
        }

        console.log(`Setting post in Redis with ID: ${post.id}`);
        try {
            const result = await this.cluster.set(`post:${post.id}`, JSON.stringify(post), 'EX', 3600);
            console.log(`Post ${post.id} set in Redis with expiry, result: ${result}`);
        } catch (error) {
            console.error(`Error setting post ${post.id} in Redis:`, error);
        }
    }
}
