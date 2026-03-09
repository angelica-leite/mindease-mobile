import { act, renderHook } from '@testing-library/react-native';

import { useAddTaskModalForm } from '@/src/presentation/hooks/use-add-task-modal-form';

describe('useAddTaskModalForm', () => {
  it('does not submit when title is empty', async () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    const onClose = jest.fn();
    const { result } = renderHook(() => useAddTaskModalForm({ onAdd, onClose }));

    await act(async () => {
      await result.current.submit();
    });

    expect(onAdd).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('submits normalized payload and resets form', async () => {
    const onAdd = jest.fn().mockResolvedValue(undefined);
    const onClose = jest.fn();
    const { result } = renderHook(() => useAddTaskModalForm({ onAdd, onClose }));

    act(() => {
      result.current.setTitle('  Nova tarefa  ');
      result.current.setDescription('  detalhe  ');
      result.current.setPriority('high');
      result.current.setEstimatedMinutes('12.7');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(onAdd).toHaveBeenCalledWith({
      title: 'Nova tarefa',
      description: 'detalhe',
      status: 'todo',
      priority: 'high',
      estimatedMinutes: 12,
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.title).toBe('');
    expect(result.current.description).toBe('');
    expect(result.current.estimatedMinutes).toBe('');
    expect(result.current.priority).toBe('medium');
  });
});
