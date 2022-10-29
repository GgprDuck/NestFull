import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateCatDto extends PartialType(
  OmitType(CreateUserDto, ['name'] as const),
) {}
