import { Task } from '@/src/domain/entities/task';
import { TaskRepository } from '@/src/domain/repositories/task-repository';
import { ToggleChecklistItem } from '@/src/domain/use-cases/toggle-checklist-item';

describe('ToggleChecklistItem', () => {
  it('toggles checklist item completion and persists', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        checklist: [
          { id: 'c1', text: 'Step 1', completed: false },
          { id: 'c2', text: 'Step 2', completed: true },
        ],
      },
    ];

    const repo: jest.Mocked<TaskRepository> = {
      add: jest.fn(),
      list: jest.fn().mockResolvedValue(tasks),
      saveAll: jest.fn().mockResolvedValue(undefined),
    };

    const sut = new ToggleChecklistItem(repo);
    const updated = await sut.execute('1', 'c1');

    expect(updated[0].checklist?.[0].completed).toBe(true);
    expect(updated[0].checklist?.[1].completed).toBe(true);
    expect(repo.saveAll).toHaveBeenCalledWith(updated);
  });
});
