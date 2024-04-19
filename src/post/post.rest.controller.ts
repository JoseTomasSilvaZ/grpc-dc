// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClassicCacheService } from './cache/classic/classic-cache-service';
import { PartitionedCacheService } from './cache/partitioned/partitioned-cache-service';
import { Post, Research } from '@prisma/client';

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

  constructor(private classicCacheService: ClassicCacheService, private partitionedCacheService: PartitionedCacheService) {}

  onModuleInit() {
    this.postService = this.client.getService<any>('PostService');
  }

  @Get('classic-cache/:id')
  async getPost(@Param('id') id: number): Promise<Post & {fromCache:boolean}> {
    let post = await this.classicCacheService.getPost(id);
    let fromCache = true;
    if (!post) {
      const postObservable: Observable<Post> = this.postService.findOne({id});
      post = await new Promise<Post>((resolve) =>
        postObservable.subscribe(resolve)
      );
      await this.classicCacheService.setPost(post);
      fromCache = false;
    }
    return {...post, fromCache}; 
  }

  @Get('partitioned-cache/:id')
  async getPartitionedPost(@Param('id') id: number): Promise<Research & {fromCache:boolean}> {
    let post = await this.partitionedCacheService.getPost(id);
    let fromCache = true;
    if (!post) {
      const postObservable: Observable<Research> = this.postService.findOne({id});
      post = await new Promise<Research>((resolve) =>
        postObservable.subscribe(resolve)
      );
      await this.partitionedCacheService.setPost(post);
      fromCache = false;
    }
    return {...post, fromCache}; 
  }
}
