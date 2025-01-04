import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model';

@ObjectType()
@Schema()
export class Blog extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => User)
  @Prop({ type: String, ref: 'User' })
  authorId: string;

  @Field({ nullable: true })
  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
