import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK_URL,
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    return {
      data: {
        token: Math.random().toString(36) + Math.random().toString(36),
        email,
        name,
        picture,
      },
      message: 'success',
    };
  }
}
