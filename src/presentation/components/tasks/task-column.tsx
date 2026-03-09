import { Plus } from 'lucide-react-native/icons';
import { Pressable, Text, View } from 'react-native';

import { Task, TaskStatus } from '@/src/domain/entities/task';
import { TaskCard } from '@/src/presentation/components/tasks/task-card';
import {
  getAccentDotStyle,
  styles,
} from '@/src/presentation/components/tasks/task-column.styles';
import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { useTaskColumnViewModel } from '@/src/presentation/hooks/use-task-column-view-model';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

type Props = {
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onChecklistToggle: (taskId: string, itemId: string) => void;
  onAddTask?: () => void;
};

export function TaskColumn({
  status,
  tasks,
  onStatusChange,
  onChecklistToggle,
  onAddTask,
}: Readonly<Props>) {
  const vm = useTaskColumnViewModel(status, tasks.length);

  return (
    <MindEaseCard style={styles.columnCard}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <View style={getAccentDotStyle(vm.accentColor)} />
          <Text style={styles.title}>{vm.label}</Text>
          <Text style={styles.count}>{vm.taskCountLabel}</Text>
        </View>
        {vm.showAddButton && onAddTask ? (
          <Pressable style={styles.addButton} onPress={onAddTask}>
            <Plus size={14} color={mindeaseTheme.color.primary} strokeWidth={2} />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.stack}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(next) => onStatusChange(task.id, next)}
            onChecklistToggle={(itemId) => onChecklistToggle(task.id, itemId)}
          />
        ))}
        {tasks.length === 0 ? <Text style={styles.empty}>{vm.emptyText}</Text> : null}
      </View>
    </MindEaseCard>
  );
}
