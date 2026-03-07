import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '@/src/domain/entities/task';
import { TaskRepository } from '@/src/domain/repositories/task-repository';

const TASKS_KEY = 'mindease:tasks';

export class AsyncStorageTaskRepository implements TaskRepository {
  async list(): Promise<Task[]> {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  }

  async saveAll(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }

  async add(task: Task): Promise<void> {
    const current = await this.list();
    await this.saveAll([...current, task]);
  }
}
