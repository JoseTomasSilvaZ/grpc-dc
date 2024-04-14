import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class PostController {
  @GrpcMethod('PostService', 'FindOne')
  findOne(data: { id: number }): { id: number; text: string } {
    return { id: data.id, text: `Hero Name ${data.id}` };
  }
}
