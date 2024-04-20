// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PartitionedCacheService } from './cache/partitioned.cache.service';
import { RetrievedPost } from './types';

@Controller('posts')
export class PostRestController {
  @Client({
    transport: Transport.GRPC,
    options: { 
      package: 'post', 
      protoPath: 'proto/hero.proto',
      url: 'localhost:50051'
    },
  })
  private client: ClientGrpc;

  private postService: any;

  constructor(
    private partitionedCacheService: PartitionedCacheService,
  ) {}

  onModuleInit() {
    this.postService = this.client.getService<any>('PostService');
  }


  @Get('partitioned-cache/:id')
  async getPost(@Param('id') id: number): Promise<RetrievedPost> {
    let post = await this.partitionedCacheService.getPost(id);
    console.log('Post from Redis:', post);
    let fromCache = true;
    if (!post) {
      try {
        const postObservable: Observable<RetrievedPost> = this.postService.findOne({id});
        post = await new Promise<RetrievedPost>((resolve, reject) =>
          postObservable.subscribe({
            next: resolve,
            error: reject
          })
        );
        console.log('Post from gRPC service:', post);
        await this.partitionedCacheService.setPost(post.post);
        fromCache = false;
      } catch (error) {
        console.error('Error fetching post from gRPC service:', error);
        return null;
      }
    }
    return post ? {...post, fromCache} : null; 
  }
}