import { IsNotEmpty, IsNumber, isNotEmpty, isNumber } from 'class-validator';

export class CreateManagerDto {
  name: string;
  money: number;
}

export class TransferMoneyDto {
  fromId: number; //发起人
  toId: number; //接收人
  // @IsNumber()
  money: number; //转账的钱
}
