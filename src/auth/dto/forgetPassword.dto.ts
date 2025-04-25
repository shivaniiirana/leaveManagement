import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
    @ApiProperty({
        description: 'The email of the user requesting password reset.',
        example: 'user@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The new password to set for the user.',
        example: 'newStrongPassword123!',
    })
    newPassword: string;
}
