import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { NullableType } from 'src/utils/types/nullable.type';
import { PlansService } from './plans.service';
import { Plan } from './domain/plan';

@ApiTags('Plans')
@Controller({
  path: 'plans',
  version: '1',
})
export class PlansPublicController {
  constructor(private readonly plansService: PlansService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Plan['id']): Promise<NullableType<Plan>> {
    return this.plansService.findOne({ id });
  }

  @Get()
  async findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }
}
