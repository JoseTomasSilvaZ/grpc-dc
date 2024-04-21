import { Post, Research } from '@prisma/client';
import Redis, { Redis as RedisClient } from 'ioredis';
import { RetrievedPost } from '../types';

export class ClassicCacheService {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = new Redis({
      host: 'redis1',
      port: 6379,
      password: '123',
    });
  }

  async getPost(id: number): Promise<RetrievedPost | null> {
    const post = await this.redisClient.get(`post:${id}`);
    const retrievedPost = {
      post: JSON.parse(post),
      source: 'Redis',
      fromCache: true,
    };
    return post ? retrievedPost : null;
  }

  async setPost(post: Research): Promise<void> {
    if (!post || post.id === undefined) {
      console.error('Invalid post data; cannot save to Redis.');
      return;
    }
    console.log(`Setting post in Redis with ID: ${post.id}`);
    try {
      const result = await this.redisClient.set(
        `post:${post.id}`,
        JSON.stringify(post),
        'EX',
        3600,
      );
      console.log(
        `Post ${post.id} set in Redis with expiry, result: ${result}`,
      );
    } catch (error) {
      console.error(`Error setting post ${post.id} in Redis:`, error);
    }
  }
}
