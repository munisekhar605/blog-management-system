import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Blog, BlogSchema } from './blog.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
