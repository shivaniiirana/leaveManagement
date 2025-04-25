import { 
  Body, 
  Controller, 
  Get, 
  Patch, 
  Req, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Request, 
  Logger, 
  InternalServerErrorException 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller({ path: 'users/api', version: '1' })
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly Awsservice: AwsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async viewProfile(@Request() req: any) {
    try {
      this.logger.log(`Fetching profile for user: ${req.user?.userId}`);
      return await this.usersService.viewProfileService(req.user.userId);
    } catch (error) {
      this.logger.error(`Error fetching profile for user ${req.user?.userId}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch profile');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @Request() req: any,
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: any
  ) {
    try {
      const userId = req.user?.userId;
      this.logger.log(`Updating profile for user: ${userId}`);

      let uploadedImageUrl: string | undefined;

      if (file) {
        this.logger.log(`Uploading file to S3 for user: ${userId}`);
        const uploadedImage = await this.Awsservice.uploadFileToS3(file);
        uploadedImageUrl = uploadedImage.Location;
        this.logger.log(`Image uploaded successfully: ${uploadedImageUrl}`);
      }

      const result = await this.usersService.updateProfileService(userId, {
        ...body,
        image: uploadedImageUrl,
      });

      this.logger.log(`Profile updated successfully for user: ${userId}`);
      return result;

    } catch (error) {
      this.logger.error(`Error updating profile for user ${req.user?.userId}`, error.stack);
      throw new InternalServerErrorException('Failed to update profile');
    }
  }
}
