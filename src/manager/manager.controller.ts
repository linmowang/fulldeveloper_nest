import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto, TransferMoneyDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { RoleGuard } from './role/role.guard';
import { ReqUrl, Role } from './role/role.decorator';

@Controller('manager')
@UseGuards(RoleGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  transferMoney(@Body() transferMoneyDto: TransferMoneyDto) {
    return this.managerService.transferMoney(transferMoneyDto);
  }

  @Get()
  // @SetMetadata('role', ['admin'])
  @Role('admin')
  findAll(@ReqUrl('123') url: string) {
    console.log(url);
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(typeof id, '================');
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
