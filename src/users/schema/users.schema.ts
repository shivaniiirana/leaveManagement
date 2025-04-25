import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop()
    lasName: string;

    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    password: string;
  

  @Prop({ required: true, unique: true })
  userName: string;

    @Prop({ required: true, unique: true })
 
  phoneNumber: string;

  @Prop()
  dob: Date;

  @Prop()
  gender: string;

  @Prop()
  image: string;

  @Prop({ default: 6 })
  totalLeaves: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
