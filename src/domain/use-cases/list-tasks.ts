import { TaskRepository } from '@/src/domain/repositories/task-repository';

export class ListTasks {
  constructor(private readonly repo: TaskRepository) {}

  execute() {
    return this.repo.list();
  }
}
