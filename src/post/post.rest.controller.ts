// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClassicCacheService } from './cache/classic.cache.service';
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
    private classicCacheService: ClassicCacheService,
  ) {}

  onModuleInit() {
    this.postService = this.client.getService<any>('PostService');
  }

  @Get('classic-cache/:id')
  async getPost(@Param('id') id: number): Promise<RetrievedPost> {
    let post = await this.classicCacheService.getPost(id);
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
        await this.classicCacheService.setPost(post.post);
        fromCache = false;
      } catch (error) {
        console.error('Error fetching post from gRPC service:', error);
        return null;
      }
    }
    return post ? {...post, fromCache} : null; 
  }

}