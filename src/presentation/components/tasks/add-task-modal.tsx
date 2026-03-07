import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddTaskInput } from '@/src/application/tasks/add-task';
import { TaskPriority } from '@/src/domain/entities/task';
import {
  getPriorityButtonStyle,
  getPriorityTextStyle,
  styles,
} from '@/src/presentation/components/tasks/add-task-modal.styles';
import { MindEaseCard } from '@/src/presentation/components/ui/mindease-card';
import { MindEasePrimaryButton } from '@/src/presentation/components/ui/mindease-primary-button';
import { useAddTaskModalForm } from '@/src/presentation/hooks/use-add-task-modal-form';
import { useAccessibility } from '@/src/presentation/contexts/accessibility-context';
import { mindeaseTheme } from '@/src/presentation/theme/mindease-theme';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (input: AddTaskInput) => Promise<void>;
};

const priorities: { value: TaskPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Baixa', color: mindeaseTheme.color.success },
  { value: 'medium', label: 'Media', color: mindeaseTheme.color.warning },
  { value: 'high', label: 'Alta', color: '#d65b5b' },
];

export function AddTaskModal({ open, onOpenChange, onAdd }: Readonly<Props>) {
  const { settings } = useAccessibility();
  const form = useAddTaskModalForm({
    onAdd,
    onClose: () => onOpenChange(false),
  });

  return (
    <Modal
      visible={open}
      transparent
      animationType={settings.reducedMotion ? 'none' : 'fade'}
      onRequestClose={() => onOpenChange(false)}
    >
      <SafeAreaView style={styles.keyboardAvoiding} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.backdrop}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <MindEaseCard style={styles.modalCard}>
              <Text style={styles.title}>Nova tarefa</Text>
              <Text style={styles.subtitle}>Preencha os campos para criar uma nova tarefa.</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput
                  value={form.title}
                  onChangeText={form.setTitle}
                  placeholder="O que voce precisa fazer?"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  style={styles.input}
                  autoFocus
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Descricao (opcional)</Text>
                <TextInput
                  value={form.description}
                  onChangeText={form.setDescription}
                  placeholder="Adicione detalhes..."
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  style={[styles.input, styles.multiline]}
                  multiline
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Prioridade</Text>
                <View style={styles.priorityRow}>
                  {priorities.map((option) => (
                    <Pressable
                      key={option.value}
                      style={getPriorityButtonStyle(form.priority === option.value, option.color)}
                      onPress={() => form.setPriority(option.value)}
                    >
                      <Text style={getPriorityTextStyle(form.priority === option.value)}>
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Tempo estimado (minutos)</Text>
                <TextInput
                  value={form.estimatedMinutes}
                  onChangeText={form.setEstimatedMinutes}
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor={mindeaseTheme.color.mutedForeground}
                  style={styles.input}
                />
              </View>

              <View style={styles.footer}>
                <Pressable style={styles.cancelButton} onPress={() => onOpenChange(false)}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
                <View style={styles.fill}>
                  <MindEasePrimaryButton onPress={() => void form.submit()}>
                    Criar tarefa
                  </MindEasePrimaryButton>
                </View>
              </View>
            </MindEaseCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
