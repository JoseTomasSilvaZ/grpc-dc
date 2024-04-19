import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { ClassicCacheService } from './cache/classic/classic-cache-service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PartitionedCacheService } from './cache/partitioned/partitioned-cache-service';

@Module({
  controllers: [PostController, PostRestController],
  providers:  [ClassicCacheService, PartitionedCacheService],
  imports: [PrismaModule]
})
export class PostModule {}
