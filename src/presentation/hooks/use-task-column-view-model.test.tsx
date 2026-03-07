import { renderHook } from '@testing-library/react-native';

import { useTaskColumnViewModel } from '@/src/presentation/hooks/use-task-column-view-model';

describe('useTaskColumnViewModel', () => {
  it('returns todo column metadata', () => {
    const { result } = renderHook(() => useTaskColumnViewModel('todo', 2));
    expect(result.current.label).toBe('A Fazer');
    expect(result.current.taskCountLabel).toBe('(2)');
    expect(result.current.showAddButton).toBe(true);
  });

  it('returns done column metadata', () => {
    const { result } = renderHook(() => useTaskColumnViewModel('done', 0));
    expect(result.current.label).toBe('Concluído');
    expect(result.current.emptyText).toBe('Nenhuma tarefa aqui');
    expect(result.current.showAddButton).toBe(false);
  });
});
