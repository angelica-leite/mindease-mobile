import { TaskStatus } from '@/src/domain/entities/task';
import { TaskRepository } from '@/src/domain/repositories/task-repository';

export class MoveTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(taskId: string, status: TaskStatus) {
    const tasks = await this.repo.list();
    const updated = tasks.map((task) => (task.id === taskId ? { ...task, status } : task));

    await this.repo.saveAll(updated);
    return updated;
  }
}
