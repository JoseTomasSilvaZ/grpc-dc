import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReplicatedCacheService } from './cache/replicated.cache.service';
@Module({
  controllers: [PostController, PostRestController],
  providers:  [ReplicatedCacheService],
  imports: [PrismaModule]
})
export class PostModule {}
