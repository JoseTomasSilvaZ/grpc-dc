// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Post, Research } from '@prisma/client';
import { PartitionedCacheService } from './cache/partitioned.cache.service';

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
  async getPartitionedPost(@Param('id') id: number): Promise<Research & {fromCache:boolean}> {
    let post = await this.partitionedCacheService.getPost(id);
    let fromCache = true;
    if (!post) {
      try {
        console.log("Fetching post from partitioned cache", id);
        const postObservable: Observable<Research> = this.postService.findOne({id});
        post = await new Promise<Research>((resolve, reject) =>
          postObservable.subscribe({
            next: resolve,
            error: reject
          })
        );
        await this.partitionedCacheService.setPost(post);
        fromCache = false;
      } catch (error) {
        console.error('Error fetching post from gRPC service:', error);
        return null;
      }
    }
    return post ? {...post, fromCache} : null; 
  }
}