import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddTaskModal } from '@/src/presentation/components/tasks/add-task-modal';
import { TaskColumn } from '@/src/presentation/components/tasks/task-column';
import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { useAccessibilityUI } from '@/src/presentation/hooks/use-accessibility-ui';
import { useTasksPageViewModel } from '@/src/presentation/hooks/use-tasks-page-view-model';
import { tasksStyles as styles } from '@/src/presentation/screens/tasks.styles';

export default function TasksScreen() {
  const {
    columns,
    isAddModalOpen,
    setIsAddModalOpen,
    loading,
    error,
    reload,
    addTask,
    moveTask,
    toggleChecklistItem,
  } = useTasksPageViewModel();
  const a11y = useAccessibilityUI();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: a11y.backgroundColor }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: a11y.space(16), gap: a11y.space(12), paddingBottom: a11y.space(30) },
        ]}
      >
        <View>
          <Text
            accessibilityRole="header"
            style={[styles.title, { fontSize: a11y.font(30), color: a11y.textColor }]}
          >
            Minhas tarefas
          </Text>
          {!a11y.summaryMode ? (
            <Text style={[styles.subtitle, { color: a11y.mutedTextColor }]}>
              Organize suas tarefas em etapas simples
            </Text>
          ) : null}
        </View>

        {error ? (
          <MindEaseCard style={{ borderColor: a11y.cardBorderColor }}>
            <Text style={styles.errorText}>Erro ao carregar tarefas: {error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => void reload()}
              accessibilityRole="button"
              accessibilityLabel="Tentar novamente"
              accessibilityHint="Recarrega a lista de tarefas"
            >
              <Text style={[styles.retryText, { color: a11y.textColor }]}>Tentar novamente</Text>
            </Pressable>
          </MindEaseCard>
        ) : null}

        {!error && loading ? (
          <MindEaseCard style={{ borderColor: a11y.cardBorderColor }}>
            <Text style={[styles.loadingText, { color: a11y.mutedTextColor }]}>Carregando tarefas...</Text>
          </MindEaseCard>
        ) : null}

        {!error && !loading
          ? columns.map((column) => (
              <TaskColumn
                key={column.status}
                status={column.status}
                tasks={column.tasks}
                onStatusChange={moveTask}
                onChecklistToggle={toggleChecklistItem}
                onAddTask={column.status === 'todo' ? () => setIsAddModalOpen(true) : undefined}
              />
            ))
          : null}
      </ScrollView>

      <AddTaskModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAdd={addTask} />
    </SafeAreaView>
  );
}
