// src/components/AlignmentForm/AlignmentForm.tsx
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import SeqPresetPicker from '../PresetPicker/PresetPicker'

export const aminoRegexp = /^[ARNDCEQGHILKMFPSTWYV-]+$/i

const schema = z
  .object({
    seq1: z
      .string()
      .min(1, 'Обязательное поле')
      .regex(
        aminoRegexp,
        'Только латинские буквы аминокислот или «-»',
      ),
    seq2: z
      .string()
      .min(1, 'Обязательное поле')
      .regex(
        aminoRegexp,
        'Только латинские буквы аминокислот или «-»',
      ),
  })
  .refine((data) => data.seq1.length === data.seq2.length, {
    message: 'Длины последовательностей должны совпадать',
    path: ['seq2'],
  })

type FormValues = z.infer<typeof schema>

interface AlignmentFormProps {
  onSubmit: (values: FormValues) => void
}

/** Инпуты для ввода последовательностей */
export default function AlignmentForm({
  onSubmit,
}: AlignmentFormProps) {
  const methods = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { seq1: '', seq2: '' },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>
          Визуализация выравнивания аминокислотных последовательностей
        </h1>

        <SeqPresetPicker />

        <Stack spacing={2}>
          <Controller
            name="seq1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Последовательность 1"
                placeholder="VLSPADKTNIKASWEKIGSHG"
                error={!!errors.seq1}
                helperText={errors.seq1?.message}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }} // todo
              />
            )}
          />

          <Controller
            name="seq2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Последовательность 2"
                placeholder="VLSPADKTNIKASWEKIGSHG"
                error={!!errors.seq2}
                helperText={errors.seq2?.message}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
          >
            Визуализация
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
