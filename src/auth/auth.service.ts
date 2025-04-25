import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as nodemailer from 'nodemailer';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly userService: UsersService,
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivanirana0919@gmail.com',
      pass: 'dwhr afbh qzck hkvd',
    },
  });

//registering user
  async registerService(userDto: RegisterDto) {
    try {
      const user = await this.userModel.findOne({ email: userDto.email });
      if (user) {
        this.logger.warn(`Attempted registration with existing email: ${userDto.email}`);
        throw new BadRequestException('User already exists');
      }

      const hashedPwd = await bcrypt.hash(userDto.password, 10);
      await new this.userModel({
        ...userDto,
        password: hashedPwd,
      }).save();

      this.logger.log(`User registered successfully: ${userDto.email}`);
      return { message: 'User registered successfully' };
    } catch (error) {
      this.logger.error('Error in registerService', error.stack);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async loginService(userDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: userDto.email });
      if (!user) {
        this.logger.warn(`Login failed - user not found: ${userDto.email}`);
        throw new UnauthorizedException('User not found');
      }

      const isMatch = await bcrypt.compare(userDto.password, user.password);
      if (!isMatch) {
        this.logger.warn(`Login failed - invalid credentials for: ${userDto.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user._id,
        userName: user.userName,
      };

      const token = jwt.sign(payload, 'abcxyz', { expiresIn: '1h' });
      this.logger.log(`User logged in: ${userDto.email}`);

      return {
        message: 'Login successful',
        token,
        userId: user._id,
      };
    } catch (error) {
      this.logger.error('Error in loginService', error.stack);
      throw error instanceof UnauthorizedException ? error : new InternalServerErrorException('Login failed');
    }
  }

  async forgetPasswordService(forgetPwdDTO: ForgetPasswordDto) {
    try {
      return await this.userService.changePasswordService(forgetPwdDTO);
    } catch (error) {
      this.logger.error('Error in forgetPasswordService', error.stack);
      throw new InternalServerErrorException('Password reset failed');
    }
  }

  async sendOtpService(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const key = `otp:${email}`;

    try {
      await this.redis.set(key, otp, 'EX', 300); // 5 minutes
      const mailOptions = {
        from: 'shivanirana0919@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
        html: `<p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`OTP sent to ${email}`);
      return { message: 'OTP sent to your email' };
    } catch (error) {
      this.logger.error('Failed to send OTP email', error.stack);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }

  async verifyOtpService(email: string, submittedOtp: string) {
    const key = `otp:${email}`;

    try {
      const storedOtp = await this.redis.get(key);

      if (!storedOtp) {
        this.logger.warn(`OTP expired or not found for email: ${email}`);
        throw new UnauthorizedException('OTP expired or not found');
      }

      if (storedOtp !== submittedOtp) {
        this.logger.warn(`Invalid OTP for email: ${email}`);
        throw new UnauthorizedException('Invalid OTP');
      }

      await this.redis.del(key);
      this.logger.log(`OTP verified successfully for email: ${email}`);

      return { message: 'OTP verified successfully' };
    } catch (error) {
      this.logger.error('Error in verifyOtpService', error.stack);
      throw error instanceof UnauthorizedException ? error : new InternalServerErrorException('OTP verification failed');
    }
  }
}
