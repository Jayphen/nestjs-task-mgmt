import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any) {
    const initialValue = value;
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${initialValue} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
