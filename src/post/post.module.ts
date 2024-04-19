import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PartitionedCacheService } from './cache/partitioned.cache.service';
@Module({
  controllers: [PostController, PostRestController],
  providers:  [PartitionedCacheService],
  imports: [PrismaModule]
})
export class PostModule {}
