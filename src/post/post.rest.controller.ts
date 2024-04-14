// src/hero/hero.rest.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { Client, ClientGrpc, Transport, GrpcOptions } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ClassicCacheService } from './cache/classic/classic-cache-service';

interface PostService {
  findOne(data: { id: number }): Observable<any>;
}

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

  private postService: PostService;

  constructor(
    private classicCacheService : ClassicCacheService
  ){}

  onModuleInit() {
    this.postService = this.client.getService<PostService>('PostService');
  }

  @Get('classic-cache/:id')
  async getPost(@Param('id') id: number): Promise<any> {
    const cachedPost = await this.classicCacheService.getPost(id);

    if (cachedPost) {
      return cachedPost;
    }

    const postObservable: Observable<any> = this.postService.findOne({ id });
    const hero = await new Promise<any>(resolve => postObservable.subscribe(resolve));

    await this.classicCacheService.getPost(id);

    return hero;
  }
}
