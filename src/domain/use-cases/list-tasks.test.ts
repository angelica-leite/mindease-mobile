import { ListTasks } from '@/src/domain/use-cases/list-tasks';
import { TaskRepository } from '@/src/domain/repositories/task-repository';

describe('ListTasks', () => {
  it('returns repository list result', async () => {
    const repo: jest.Mocked<TaskRepository> = {
      add: jest.fn(),
      list: jest.fn().mockResolvedValue([]),
      saveAll: jest.fn(),
    };

    const sut = new ListTasks(repo);
    const result = await sut.execute();

    expect(repo.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
