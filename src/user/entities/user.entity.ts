import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';

import { Tag } from './tag.entitiy';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名字', nullable: false })
  name: string;

  @Column({ comment: '密码', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Generated('uuid')
  uuid: string;

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
