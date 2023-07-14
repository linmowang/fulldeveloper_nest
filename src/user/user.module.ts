import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entitiy';
import { Logger } from 'src/middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(comsumer: MiddlewareConsumer) {
    // comsumer.apply(Logger).forRoutes('user');
    // comsumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user/config', method: RequestMethod.GET });
    comsumer.apply(Logger).forRoutes(UserController);
  }
}
