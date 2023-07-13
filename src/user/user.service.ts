import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Tag } from './entities/tag.entitiy';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tag) private readonly tag: Repository<Tag>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.password = createUserDto.password;
    return this.user.save(data);
  }

  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({ where: { id: params.userId } });
    const tagList: Tag[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      let temp = new Tag();
      temp.tag = params.tags[i];
      await this.tag.save(temp);
      tagList.push(temp);
    }

    userInfo.tags = tagList;
    return await this.user.save(userInfo);
  }

  async findAll(query: { keyword: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      // select: ['id', 'name', 'createTime'],
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyword}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyword}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
