import { fireEvent, render } from '@testing-library/react-native';
import { View } from 'react-native';

import { MindEasePrimaryButton } from '@/src/presentation/components/ui/mindease-primary-button';

describe('MindEasePrimaryButton', () => {
  it('renders label and left icon', () => {
    const { getByText, getByTestId } = render(
      <MindEasePrimaryButton leftIcon={<View testID="left-icon" />}>Criar tarefa</MindEasePrimaryButton>,
    );

    expect(getByText('Criar tarefa')).toBeTruthy();
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<MindEasePrimaryButton onPress={onPress}>Salvar</MindEasePrimaryButton>);

    fireEvent.press(getByText('Salvar'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
