import { Check, Circle, Clock4 } from 'lucide-react-native/icons';
import { Pressable, Switch, Text, View } from 'react-native';

import { Task, TaskStatus } from '@/src/domain/entities/task';
import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import {
  getCardStyle,
  getProgressFillStyle,
  styles,
} from '@/src/presentation/components/tasks/task-card.styles';
import { useTaskCardViewModel } from '@/src/presentation/hooks/use-task-card-view-model';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

type Props = {
  task: Task;
  onStatusChange: (status: TaskStatus) => void;
  onChecklistToggle: (itemId: string) => void;
};

export function TaskCard({ task, onStatusChange, onChecklistToggle }: Readonly<Props>) {
  const vm = useTaskCardViewModel(task);

  const priorityBorderColor =
    task.priority === 'low'
      ? mindeaseTheme.color.success
      : task.priority === 'medium'
        ? mindeaseTheme.color.warning
        : '#d65b5b';

  const ActionIcon = vm.isDone ? Circle : Check;

  return (
    <MindEaseCard style={getCardStyle(priorityBorderColor)}>
      <Text style={[styles.title, vm.isDone && styles.titleDone]}>{task.title}</Text>
      {task.description ? <Text style={styles.description}>{task.description}</Text> : null}

      {vm.hasChecklist ? (
        <View style={styles.checklistWrap}>
          {vm.visibleChecklistItems.map((item) => (
            <View key={item.id} style={styles.checkItem}>
              <Text style={[styles.checkText, item.completed && styles.checkDone]}>
                {item.text}
              </Text>
              <Switch value={item.completed} onValueChange={() => onChecklistToggle(item.id)} />
            </View>
          ))}
          {vm.hiddenChecklistCount > 0 ? (
            <Text style={styles.hiddenCount}>+{vm.hiddenChecklistCount} itens</Text>
          ) : null}
          <View style={styles.progressTrack}>
            <View style={getProgressFillStyle(vm.checklistProgress)} />
          </View>
        </View>
      ) : null}

      <View style={styles.footer}>
        {vm.estimatedMinutesLabel ? (
          <View style={styles.estimateWrap}>
            <Clock4 size={14} color={mindeaseTheme.color.mutedForeground} strokeWidth={2} />
            <Text style={styles.estimateText}>{vm.estimatedMinutesLabel}</Text>
          </View>
        ) : (
          <View />
        )}

        <Pressable style={styles.actionButton} onPress={() => onStatusChange(vm.action.next)}>
          <ActionIcon size={14} color={mindeaseTheme.color.primary} strokeWidth={2} />
          <Text style={styles.actionText}>{vm.action.label}</Text>
        </Pressable>
      </View>
    </MindEaseCard>
  );
}
