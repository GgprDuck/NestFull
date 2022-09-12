import { CreateUserDto } from './create-user.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class UpdateCatDto extends PartialType(
  OmitType(CreateUserDto, ['name'] as const),
) {}
