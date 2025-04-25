import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { LoggerService } from 'src/logger/logger.service';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Tagging this controller for the Swagger UI
@Controller({ path: 'users/api', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly Awsservice: AwsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto }) // Request body for registering a user
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() userDto: RegisterDto, @UploadedFile() file?: Express.Multer.File) {
    this.loggerService.log('Register endpoint called');
    try {
      let uploadedImageUrl: string | undefined;
      if (file) {
        const uploadedImage = await this.Awsservice.uploadFileToS3(file);
        uploadedImageUrl = uploadedImage.Location;
        this.loggerService.log(`Image uploaded to S3: ${uploadedImageUrl}`);
      }

      const result = await this.authService.registerService({
        ...userDto,
        image: uploadedImageUrl,
      });

      this.loggerService.log('User registered successfully');
      return result;
    } catch (error) {
      this.loggerService.error('Error in register endpoint', error.stack);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto }) // Request body for logging in a user
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() userDto: LoginDto) {
    this.loggerService.log('Login endpoint called');
    try {
      const result = await this.authService.loginService(userDto);
      this.loggerService.log('User login successful');
      return result;
    } catch (error) {
      this.loggerService.error('Error in login endpoint', error.stack);
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiBody({ type: ForgetPasswordDto }) // Request body for password reset
  @ApiResponse({ status: 200, description: 'Password reset request successful' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async forgetPassword(@Body() forgetPwdDTO: ForgetPasswordDto) {
    this.loggerService.log('Forget password endpoint called');
    try {
      const result = await this.authService.forgetPasswordService(forgetPwdDTO);
      this.loggerService.log('Forget password service completed');
      return result;
    } catch (error) {
      this.loggerService.error('Error in forget-password endpoint', error.stack);
      throw new InternalServerErrorException('Forget password failed');
    }
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async sendOtp(@Body() body: { email: string }) {
    this.loggerService.log(`Send OTP endpoint called for email: ${body.email}`);
    try {
      const result = await this.authService.sendOtpService(body.email);
      this.loggerService.log('OTP sent successfully');
      return result;
    } catch (error) {
      this.loggerService.error('Error in send-otp endpoint', error.stack);
      throw new InternalServerErrorException('Failed to send OTP');
    }
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    this.loggerService.log(`Verify OTP endpoint called for email: ${body.email}`);
    try {
      const result = await this.authService.verifyOtpService(body.email, body.otp);
      this.loggerService.log('OTP verified successfully');
      return result;
    } catch (error) {
      this.loggerService.error('Error in verify-otp endpoint', error.stack);
      throw new InternalServerErrorException('Failed to verify OTP');
    }
  }
}
