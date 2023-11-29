import {Module} from '@nestjs/common';
import {PrismaModule} from '@/@services/prisma/prisma.module';
import {AppController} from '@/app.controller';
import {AppService} from '@/app.service';
import {FolderModule} from '@/folder/folder.module';
import {FileModule} from '@/file/file.module';
import {GoogleStrategy} from '@/@strategies/google.strategy';
import {UserModule} from '@/user/user.module';
import {JwtModule, JwtService} from '@nestjs/jwt';
import * as process from 'process';
import {JwtStrategy} from '@/@strategies/jwt.strategy';
import {JwtAuthGuard} from '@/@guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    FolderModule,
    FileModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {expiresIn: '8h'}
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, JwtStrategy, JwtService, JwtAuthGuard]
})
export class AppModule {}
