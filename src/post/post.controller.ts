import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Post, Research } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class PostController {

  constructor(private readonly prisma: PrismaService){}

  @GrpcMethod('PostService', 'FindOne')
  async findOne({id}: {id:number}): Promise<Research> {
    try {
      console.log(id)
    const post = await this.prisma.research.findUnique({
      where: {
        id
      }
    })
    console.log({post})
    return post;
    } catch (error) {
      console.log(error)
    }
  }
}
