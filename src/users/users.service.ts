import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { User } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ForgetPasswordDto } from 'src/auth/dto/forgetPassword.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async create(user: RegisterDto) {
//     try {
//       const newUser = await this.userModel.create(user);
//       this.logger.log(`User created with email: ${user.email}`);
//       return newUser;
//     } catch (error) {
//       this.logger.error(`Error creating user with email: ${user.email}`, error.stack);
//       throw new InternalServerErrorException('User creation failed');
//     }
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     try {
//       this.logger.log(`Finding user by email: ${email}`);
//       return await this.userModel.findOne({ email }).exec();
//     } catch (error) {
//       this.logger.error(`Error finding user by email: ${email}`, error.stack);
//       throw new InternalServerErrorException('Failed to find user');
//     }
//   }

//   async findById(id: string): Promise<User | null> {
//     try {
//       this.logger.log(`Finding user by id: ${id}`);
//       return await this.userModel.findById(id).exec(); // fixed issue (was `findOne({id})`)
//     } catch (error) {
//       this.logger.error(`Error finding user by id: ${id}`, error.stack);
//       throw new InternalServerErrorException('Failed to find user');
//     }
//   }

  async viewProfileService(id: string): Promise<User | null> {
    try {
      this.logger.log(`Viewing profile for user: ${id}`);
      return await this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(`Error viewing profile for user: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to view profile');
    }
  }

  async changePasswordService(forgetPwdDTO: ForgetPasswordDto) {
    const { email, newPassword } = forgetPwdDTO;
    try {
      this.logger.log(`Changing password for email: ${email}`);
      const user = await this.userModel.findOne({ email });
      if (!user) {
        this.logger.warn(`User not found for password reset: ${email}`);
        throw new NotFoundException('User not found');
      }

      const hashedPwd = await bcrypt.hash(newPassword, 10);
      user.password = hashedPwd;
      await user.save();
      this.logger.log(`Password updated successfully for email: ${email}`);
      return { message: 'Password changed successfully' };
    } catch (error) {
      this.logger.error(`Error changing password for email: ${email}`, error.stack);
      throw new InternalServerErrorException('Failed to change password');
    }
  }

  async updateProfileService(userId: string, updateData: { [key: string]: any }): Promise<{ message: string; updatedUser?: User }> {
    try {
      this.logger.log(`Updating profile for user: ${userId}`);
      const user = await this.userModel.findById(userId);
      if (!user) {
        this.logger.warn(`User not found for update: ${userId}`);
        return { message: 'User not found' };
      }

      await this.userModel.updateOne({ _id: userId }, updateData);
      const updatedUser = { ...user.toObject(), ...updateData };

      this.logger.log(`Profile updated successfully for user: ${userId}`);
      return { message: 'Profile updated successfully', updatedUser };
    } catch (error) {
      this.logger.error(`Error updating profile for user: ${userId}`, error.stack);
      throw new InternalServerErrorException('Failed to update profile');
    }
  }
}
