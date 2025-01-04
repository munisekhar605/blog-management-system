import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput, UpdateBlogInput } from './blog.input';
import { Blog } from './blog.model';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [Blog])
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  @Query(() => [Blog])
  async getFilteredBlogs(@Args('filter') filter: string): Promise<Blog[]> {
    return this.blogService.getFilteredBlogs(filter);
  }

  @Mutation(() => Blog)
  async createBlog(@Args('createBlogInput') createBlogInput: CreateBlogInput): Promise<Blog> {
    return this.blogService.createBlog(createBlogInput);
  }

  @Mutation(() => Blog)
  async updateBlog(@Args('id') id: string, @Args('updateBlogInput') updateBlogInput: UpdateBlogInput): Promise<Blog> {
    return this.blogService.updateBlog(id, updateBlogInput);
  }

  @Mutation(() => Blog)
  async softDeleteBlog(@Args('id') id: string): Promise<Blog> {
    return this.blogService.softDeleteBlog(id);
  }
}
