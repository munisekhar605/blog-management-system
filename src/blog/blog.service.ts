import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.model';
import { CreateBlogInput, UpdateBlogInput } from './blog.input';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(createBlogInput: CreateBlogInput): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogInput);
    return createdBlog.save();
  }

  async getAllBlogs(): Promise<Blog[]> {
    return this.blogModel.find({ deletedAt: null }).populate('authorId').exec();
  }

  async getFilteredBlogs(filter: string): Promise<Blog[]> {
    return this.blogModel
      .find({ 
        deletedAt: null, 
        $or: [{ title: { $regex: filter, $options: 'i' } }, { content: { $regex: filter, $options: 'i' } }] 
      })
      .populate('authorId')
      .exec();
  }

  async updateBlog(id: string, updateBlogInput: UpdateBlogInput): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogInput, { new: true });
  }

  async softDeleteBlog(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
