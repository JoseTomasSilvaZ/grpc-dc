import { Module } from '@nestjs/common';
import { PostRestController } from './post.rest.controller';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClassicCacheService } from './cache/classic.cache.service';
@Module({
  controllers: [PostController, PostRestController],
  providers: [ClassicCacheService],
  imports: [PrismaModule],
})
export class PostModule {}
