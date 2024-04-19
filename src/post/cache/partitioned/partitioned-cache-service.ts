import { Injectable } from '@nestjs/common';
import { Post, Research } from "@prisma/client";
import Redis, { Redis as RedisClient, Cluster, ClusterNode } from "ioredis";

@Injectable()
export class PartitionedCacheService {
    // private partitions: Record<number, RedisClient>;
    private cluster: Cluster
    constructor() {
        const nodes: ClusterNode[] = [
            {host: "localhost", port: 6379},
            {host: "localhost", port: 6380},
            {host: "localhost", port: 6381},
        ]
        
        this.cluster = new Redis.Cluster(nodes, {
            redisOptions: {
                password: "my_password"
            }
        })
    }

    // private getPartitionId(id: number): number {
    //     return (id % Object.keys(this.partitions).length) + 1;
    // }
    

    async getPost(id: number): Promise< Research | null> {
        // const partitionId = this.getPartitionId(id);
        // const post = await this.partitions[partitionId].get(`post:${id}`);
        // return post ? JSON.parse(post) : null;
        const post = await this.cluster.get(`post:${id}`)
        return post ? JSON.parse(post) : null
    }

    async setPost(post: Research): Promise<void> {
        // const partitionId = this.getPartitionId(post.id);
        // await this.partitions[partitionId].set(`post:${post.id}`, JSON.stringify(post), 'EX', 3600);
        await this.cluster.set(`post:${post.id}`, JSON.stringify(post), 'EX', 3600);
    }
}
