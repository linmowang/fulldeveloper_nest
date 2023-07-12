import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ comment: '用户名字', nullable: false })
  name: string;

  @Column({ comment: '密码', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Generated('uuid')
  uuid: string;
}
