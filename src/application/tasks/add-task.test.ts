import { AddTask } from '@/src/application/tasks/add-task';
import { Task } from '@/src/domain/entities/task';
import { TaskRepository } from '@/src/domain/repositories/task-repository';

describe('AddTask', () => {
  it('adds task and returns updated list', async () => {
    const repo: jest.Mocked<TaskRepository> = {
      add: jest.fn().mockResolvedValue(undefined),
      list: jest.fn().mockResolvedValue([
        {
          id: '1',
          title: 'Task 1',
          status: 'todo',
          priority: 'medium',
          createdAt: new Date().toISOString(),
        } satisfies Task,
      ]),
      saveAll: jest.fn().mockResolvedValue(undefined),
    };

    const sut = new AddTask(repo);

    const result = await sut.execute({
      title: 'Task 1',
      status: 'todo',
      priority: 'medium',
    });

    expect(repo.add).toHaveBeenCalledTimes(1);
    expect(repo.add.mock.calls[0][0].id).toBeTruthy();
    expect(repo.add.mock.calls[0][0].createdAt).toBeTruthy();
    expect(result).toHaveLength(1);
  });
});
