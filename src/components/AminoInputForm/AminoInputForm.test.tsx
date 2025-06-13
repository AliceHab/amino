import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AminoInputForm from './AminoInputForm';

describe('AminoInputForm', () => {
  it('submit заблокирован при невалидных данных', async () => {
    const handleSubmit = jest.fn();
    render(<AminoInputForm onSubmit={handleSubmit} />);

    const btn = screen.getByRole('button', { name: /визуализация/i });
    expect(btn).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/последовательность 1/i), 'ZZ');
    expect(await screen.findByText(/только латинские/i)).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  it('onSubmit активен при валидных данных', async () => {
    const handleSubmit = jest.fn();
    render(<AminoInputForm onSubmit={handleSubmit} />);

    await userEvent.type(
      screen.getByLabelText(/последовательность 1/i),
      'AAA',
    );
    await userEvent.type(
      screen.getByLabelText(/последовательность 2/i),
      'GGG',
    );

    const btn = screen.getByRole('button', { name: /визуализация/i });
    expect(btn).toBeEnabled();

    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledWith(
      { seq1: 'AAA', seq2: 'GGG' },
      expect.anything(),
    );
  });
});
