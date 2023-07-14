import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abc123',
      database: 'nest_crud',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //所有实体文件
      synchronize: true, //是否自动将实体类同步到数据库
      retryDelay: 500, //重连接数据库间隔
      retryAttempts: 10, //重连接最大次数
      autoLoadEntities: true, //如果为true,将自动加载实体forFeature()方法注册的每个实体都将自动添加到配置对象的实体
    }),
    UserModule,
    ConfigModule.forRoot({
      path: '/static',
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
