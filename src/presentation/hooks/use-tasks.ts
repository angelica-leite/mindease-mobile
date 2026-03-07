import { useCallback, useEffect, useMemo, useState } from 'react';

import { AddTaskInput } from '@/src/application/tasks/add-task';
import { Task, TaskStatus } from '@/src/domain/entities/task';
import { taskServices } from '@/src/infrastructure/di/tasks';

const DEFAULT_TASKS_ERROR = 'Nao foi possível carregar tarefas.';

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return DEFAULT_TASKS_ERROR;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskServices.list.execute();
      setTasks(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addTask = useCallback(async (input: AddTaskInput) => {
    setError(null);
    try {
      const updated = await taskServices.add.execute(input);
      setTasks(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  const moveTask = useCallback(async (taskId: string, status: TaskStatus) => {
    setError(null);
    try {
      const updated = await taskServices.move.execute(taskId, status);
      setTasks(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  const toggleChecklistItem = useCallback(async (taskId: string, itemId: string) => {
    setError(null);
    try {
      const updated = await taskServices.toggleChecklist.execute(taskId, itemId);
      setTasks(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  const stats = useMemo(() => {
    const todo = tasks.filter((task) => task.status === 'todo').length;
    const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
    const done = tasks.filter((task) => task.status === 'done').length;
    return { total: tasks.length, todo, inProgress, done };
  }, [tasks]);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((task) => task.status === status),
    [tasks],
  );

  return {
    tasks,
    loading,
    error,
    stats,
    addTask,
    moveTask,
    toggleChecklistItem,
    getTasksByStatus,
    reload: load,
  };
}
