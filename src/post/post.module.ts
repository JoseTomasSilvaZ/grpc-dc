import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { ClassicCacheService } from './cache/classic/classic-cache-service';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController, PostRestController],
  providers:  [ClassicCacheService]
})
export class PostModule {}
