import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
