import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorisDto } from './create-categoris.dto';

export class UpdateCategorisDto extends PartialType(CreateCategorisDto) {}
