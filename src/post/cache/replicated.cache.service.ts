import { Injectable } from '@nestjs/common';
import { Post, Research } from "@prisma/client";
import Redis, { Redis as RedisClient } from "ioredis";
import { RetrievedPost } from '../types';

@Injectable()
export class ReplicatedCacheService {
    private redisClient: RedisClient;
    private slaves: Record<number, RedisClient>;

    constructor() {
        this.redisClient = new Redis({
            host: 'host.docker.internal',
            password: '123',
            port: 6379,
        });

        this.redisClient.on("connect", () => {
            console.log("Connected to Redis master");
        }).on("error", (err) => {
            console.error("Redis master connection error:", err);
        });

        this.slaves = {
            1: new Redis({
                host: 'host.docker.internal',
                password: '123',
                port: 6380,
            }),
            2: new Redis({
                host: 'host.docker.internal',
                password: '123',
                port: 6381,
            }),
        };

        Object.keys(this.slaves).forEach(key => {
            this.slaves[key].on("connect", () => {
                console.log(`Connected to Redis slave ${key}`);
            }).on("error", (err) => {
                console.error(`Redis slave ${key} connection error:`, err);
            });
        });
    }

    async getPost(id: number): Promise<RetrievedPost | null> {
        const randomizedSlave = Math.floor(Math.random() * 2) + 1;
        console.log({randomizedSlave})
        const post = await this.slaves[randomizedSlave].get(`post:${id}`);
        const retrievedPost = {post: JSON.parse(post), source: `Redis slave ${randomizedSlave}`, fromCache: true}

        return post ? retrievedPost : null;
    }

    async setPost(post: Research): Promise<void> {
        
        await this.redisClient.set(`post:${post.id}`, JSON.stringify(post), 'EX', 3600);
    }
}
