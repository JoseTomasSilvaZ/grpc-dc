// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClassicCacheService } from './cache/classic/classic-cache-service';
import { Post } from '@prisma/client';

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

  constructor(private classicCacheService: ClassicCacheService) {}

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
}
