import type { Task } from '@/src/domain/entities/task';
import type { TaskRepository } from '@/src/domain/repositories/task-repository';

export type AddTaskInput = Omit<Task, 'id' | 'createdAt'>;

export class AddTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(input: AddTaskInput): Promise<Task[]> {
    const task: Task = {
      ...input,
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    };

    await this.repo.add(task);
    return this.repo.list();
  }
}
