import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  authorId: string;
}

@InputType()
export class UpdateBlogInput {
  @Field()
  @IsString()
  title?: string;

  @Field()
  @IsString()
  content?: string;
}
