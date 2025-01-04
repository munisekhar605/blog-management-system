import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlogModule } from '../blog/blog.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    BlogModule,
    UserModule,
  ],
})
export class GraphqlModule {}
