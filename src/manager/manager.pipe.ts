import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ManagerPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    console.log(DTO);

    return value;
  }
}
