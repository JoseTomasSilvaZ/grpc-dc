import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { RetrievedPost } from './types';

@Controller()
export class PostController {

  constructor(private readonly prisma: PrismaService){}

  @GrpcMethod('PostService', 'FindOne')
  async findOne({id}: {id:number}): Promise<RetrievedPost> {
    try {
      console.log(id)
    const post = await this.prisma.research.findUnique({
      where: {
        id
      }
    })
    return {post, source: "Prisma"};
    } catch (error) {
      console.log(error)
    }
  }
}
