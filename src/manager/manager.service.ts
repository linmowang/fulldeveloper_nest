import { Injectable } from '@nestjs/common';
import { CreateManagerDto, TransferMoneyDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly manager: Repository<Manager>,
  ) {}

  async transferMoney(transferMoneyDto: TransferMoneyDto) {
    try {
      return this.manager.manager.transaction(async (manager) => {
        const from = await this.manager.findOne({
          where: { id: transferMoneyDto.fromId },
        });

        const to = await this.manager.findOne({
          where: { id: transferMoneyDto.toId },
        });

        if (transferMoneyDto.money > from.money) {
          return '余额不足';
        } else {
          await manager.update(
            Manager,
            { id: transferMoneyDto.fromId },
            {
              money: from.money - transferMoneyDto.money,
            },
          );
          // await manager.save(Manager, {
          //   id: transferMoneyDto.fromId,
          //   name: from.name,
          //   money: from.money - transferMoneyDto.money,
          // });
          await manager.update(
            Manager,
            { id: transferMoneyDto.toId },
            {
              money: to.money + Number(transferMoneyDto.money),
            },
          );
          // await manager.save(Manager, {
          //   id: transferMoneyDto.toId,
          //   name: to.name,
          //   money: to.money + transferMoneyDto.money,
          // });
          return '转账成功';
        }
      });
    } catch (error) {
      return error;
    }
  }

  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
