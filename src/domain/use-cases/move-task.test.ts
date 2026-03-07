import { Task } from '@/src/domain/entities/task';
import { TaskRepository } from '@/src/domain/repositories/task-repository';
import { MoveTask } from '@/src/domain/use-cases/move-task';

describe('MoveTask', () => {
  it('updates only selected task status and saves', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'A',
        status: 'todo',
        priority: 'low',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'B',
        status: 'done',
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
    ];

    const repo: jest.Mocked<TaskRepository> = {
      add: jest.fn(),
      list: jest.fn().mockResolvedValue(tasks),
      saveAll: jest.fn().mockResolvedValue(undefined),
    };

    const sut = new MoveTask(repo);
    const updated = await sut.execute('1', 'in-progress');

    expect(updated[0].status).toBe('in-progress');
    expect(updated[1].status).toBe('done');
    expect(repo.saveAll).toHaveBeenCalledWith(updated);
  });
});
