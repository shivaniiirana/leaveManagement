import { Injectable, BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';  // For MIME type checks

@Injectable()
export class AwsService {
  private s3: S3;
  private readonly MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes
  private readonly ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

  constructor() {
    this.s3 = new S3({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  // Helper function to check if file is an allowed image type
  private isImage(file: Express.Multer.File): boolean {
    return this.ALLOWED_MIME_TYPES.includes(file.mimetype);
  }

  async uploadFileToS3(file: Express.Multer.File): Promise<{ Location: string }> {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds the 20MB limit.');
    }

    // Check if file is an image
    if (!this.isImage(file)) {
      throw new BadRequestException('Only image files (JPEG, PNG, GIF) are allowed.');
    }

    try {
      // Upload to S3
      const result = await this.s3.upload({
        Bucket: 'bookabcxyz', // replace with your actual bucket name
        Key: `book-images/${uuid()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise();

      return { Location: result.Location };
    } catch (error) {
      throw new BadRequestException('Error uploading file to S3: ' + error.message);
    }
  }
}
