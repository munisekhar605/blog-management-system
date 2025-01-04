import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/user/user.model'

describe('UserService', () => {
  let service: UserService;
  const mockUserModel = {
    create: jest.fn().mockImplementation((user) => Promise.resolve({ _id: '1', ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { name: 'Test User', email: 'test@example.com', password: 'password' };
    const result = await service.createUser(user);
    expect(result).toEqual({ _id: '1', ...user });
    expect(mockUserModel.create).toHaveBeenCalledWith(user);
  });
});
