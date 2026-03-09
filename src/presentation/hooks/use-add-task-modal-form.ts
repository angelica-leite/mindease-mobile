import { useCallback, useMemo, useState } from 'react';

import { AddTaskInput } from '@/src/application/tasks/add-task';
import { TaskPriority } from '@/src/domain/entities/task';

type Params = {
  onAdd: (input: AddTaskInput) => Promise<void>;
  onClose: () => void;
};

export function useAddTaskModalForm({ onAdd, onClose }: Params) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');

  const submit = useCallback(async () => {
    const safeTitle = title.trim();
    if (!safeTitle) return;

    const parsed = Number(estimatedMinutes);
    const safeMinutes =
      estimatedMinutes && Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : undefined;

    await onAdd({
      title: safeTitle,
      description: description.trim() || undefined,
      status: 'todo',
      priority,
      estimatedMinutes: safeMinutes,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setEstimatedMinutes('');
    onClose();
  }, [title, estimatedMinutes, onAdd, description, priority, onClose]);

  return useMemo(
    () => ({
      title,
      setTitle,
      description,
      setDescription,
      priority,
      setPriority,
      estimatedMinutes,
      setEstimatedMinutes,
      submit,
    }),
    [title, description, priority, estimatedMinutes, submit],
  );
}
