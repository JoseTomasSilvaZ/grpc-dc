import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { ClassicCacheService } from './cache/classic/classic-cache-service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PostController, PostRestController],
  providers:  [ClassicCacheService],
  imports: [PrismaModule]
})
export class PostModule {}
