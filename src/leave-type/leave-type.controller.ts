import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { LeaveType } from './schema/leave-type.schema';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto/leave-type.dto';

@Controller('leave-types')
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  // Create a new leave type
  @Post()
  async create(@Body() createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    return this.leaveTypeService.create(createLeaveTypeDto);
  }

  // Get all leave types
  @Get()
  async findAll(): Promise<LeaveType[]> {
    return this.leaveTypeService.findAll();
  }

  // Get a specific leave type by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeaveType> {
    return this.leaveTypeService.findOne(id);
  }

 
}