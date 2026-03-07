import { AddTask } from '@/src/application/tasks/add-task';
import { ListTasks } from '@/src/domain/use-cases/list-tasks';
import { MoveTask } from '@/src/domain/use-cases/move-task';
import { ToggleChecklistItem } from '@/src/domain/use-cases/toggle-checklist-item';
import { AsyncStorageTaskRepository } from '@/src/infrastructure/repositories/async-storage/task-repository.async';

const repo = new AsyncStorageTaskRepository();

export const taskServices = {
  add: new AddTask(repo),
  list: new ListTasks(repo),
  move: new MoveTask(repo),
  toggleChecklist: new ToggleChecklistItem(repo),
};
