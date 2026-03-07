import { TaskRepository } from '@/src/domain/repositories/task-repository';

export class ToggleChecklistItem {
  constructor(private readonly repo: TaskRepository) {}

  async execute(taskId: string, itemId: string) {
    const tasks = await this.repo.list();
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;

      const checklist = (task.checklist ?? []).map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      );

      return { ...task, checklist };
    });

    await this.repo.saveAll(updated);
    return updated;
  }
}
