import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class PostController {

  constructor(private readonly prisma: PrismaService){}

  @GrpcMethod('PostService', 'FindOne')
  async findOne({id}: {id:number}): Promise<Post> {
    try {
      console.log("retrieving post in server:", id)
    const post = await this.prisma.post.findUnique({
      where: {
         id
      }
    })
    return post;
    } catch (error) {
      console.log(error)
    }
  }
}
