import Redis, {Cluster} from "ioredis"

export class PartitionedCacheService{
    private redisCluster: Cluster;

    constructor(){
        const nodes = [{
            host: process.env.REDIS_HOST1 || 'localhost'
            // port: 
        },
        {
            host: process.env.REDIS_HOST2 || 'localhost'
        },
        {
            host: process.env.REDIS_HOST3 || 'localhost'
        }
        ]
    }
}