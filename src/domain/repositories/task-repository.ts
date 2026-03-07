import { Task } from '@/src/domain/entities/task';

export interface TaskRepository {
  list(): Promise<Task[]>;
  saveAll(tasks: Task[]): Promise<void>;
  add(task: Task): Promise<void>;
}
