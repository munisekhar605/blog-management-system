import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '../src/blog/blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { Blog } from '../src/blog/blog.model';


describe('BlogService', () => {
  let service: BlogService;
  const mockBlogModel = {
    create: jest.fn().mockImplementation((blog) => Promise.resolve({ _id: '1', ...blog })),
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: '1', title: 'Test Blog', content: 'Content', deletedAt: null }]),
    }),
    findByIdAndUpdate: jest.fn().mockImplementation((id, update) => Promise.resolve({ _id: id, ...update })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(Blog.name),
          useValue: mockBlogModel,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a blog', async () => {
    const blog = { title: 'Test Blog', content: 'Content', authorId: '123' };
    const result = await service.createBlog(blog);
    expect(result).toEqual({ _id: '1', ...blog });
    expect(mockBlogModel.create).toHaveBeenCalledWith(blog);
  });

  it('should get all blogs', async () => {
    const result = await service.getAllBlogs();
    expect(result).toEqual([{ _id: '1', title: 'Test Blog', content: 'Content', deletedAt: null }]);
  });

  it('should update a blog', async () => {
    const update = { title: 'Updated Title' };
    const result = await service.updateBlog('1', update);
    expect(result).toEqual({ _id: '1', ...update });
    expect(mockBlogModel.findByIdAndUpdate).toHaveBeenCalledWith('1', update, { new: true });
  });

  it('should soft delete a blog', async () => {
    const result = await service.softDeleteBlog('1');
    expect(result).toEqual({ _id: '1', deletedAt: expect.any(Date) });
    expect(mockBlogModel.findByIdAndUpdate).toHaveBeenCalledWith('1', { deletedAt: expect.any(Date) }, { new: true });
  });
});
