import {
  MenuItem,
  TextField,
  Stack,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { aminoRegexp } from '../AminoInputForm/AminoInputForm'

const PRESETS = [
  {
    id: 'mongoose_hba',
    label: 'Гемоглобин α — мангуст',
    seq: 'VLSPADKTNIKASWEKIGSHGGEYGAEALERTFLCFPTTKTYFPHFDLSHGSAQVKAHGKKVADALTNAVGHLDDLPGALSALSDLHAYKLRVDPVNFKLLSHCLLVTLASHHPAEFT',
  },
  {
    id: 'human_hba',
    label: 'Гемоглобин α — человек',
    seq: 'VLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDP',
  },
]

const LS_KEY = 'amino-presets'
type Preset = { id: string; label: string; seq: string }

export default function SeqPresetPicker() {
  const { control, setValue, getValues } = useFormContext()
  const [open, setOpen] = useState(false)
  const [userPresets, setUserPresets] = useState<Preset[]>([])
  const [newName, setNewName] = useState('')
  const [newSeq, setNewSeq] = useState('')

  const selectedId = useWatch({ control, name: 'preset' })
  const allPresets = [...PRESETS, ...userPresets]
  const preset = allPresets.find((p) => p.id === selectedId)
  const isUserPreset = userPresets.some((p) => p.id === selectedId)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setUserPresets(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])

  const savePresets = (list: Preset[]) => {
    setUserPresets(list)
    localStorage.setItem(LS_KEY, JSON.stringify(list))
  }

  const insert = (target: 'seq1' | 'seq2') =>
    preset && setValue(target, preset.seq, { shouldValidate: true })

  const canSave =
    newName.trim().length >= 3 && aminoRegexp.test(newSeq.trim())

  const handleSave = () => {
    if (!canSave) return
    const id = `user_${Date.now()}`
    const entry = {
      id,
      label: newName.trim(),
      seq: newSeq.trim().toUpperCase(),
    }
    savePresets([...userPresets, entry])
    setOpen(false)
    setNewName('')
    setNewSeq('')
    setValue('preset', id)
  }

  const deletePreset = () => {
    if (!isUserPreset) return
    const updated = userPresets.filter((p) => p.id !== selectedId)
    savePresets(updated)
    setValue('preset', '')
  }

  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={1} mb={5}>
        <Controller
          name="preset"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Примеры последовательностей"
            >
              {allPresets.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Tooltip title="Вставить в верхнюю">
          <Button
            variant="outlined"
            size="small"
            disabled={!preset}
            onClick={() => insert('seq1')}
          >
            Вверх
          </Button>
        </Tooltip>

        <Tooltip title="Вставить в нижнюю">
          <Button
            variant="outlined"
            size="small"
            disabled={!preset}
            onClick={() => insert('seq2')}
          >
            Вниз
          </Button>
        </Tooltip>

        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setNewSeq(getValues('seq1') || getValues('seq2') || '')
            setOpen(true)
          }}
        >
          +
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          disabled={!isUserPreset}
          onClick={deletePreset}
        >
          −
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Сохранить последовательность</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Название (≥3 симв.)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
          <TextField
            label="Последовательность"
            placeholder="VLSPADKT…"
            helperText="Допустимы только латинские буквы аминокислот и «-»"
            value={newSeq}
            onChange={(e) => setNewSeq(e.target.value.toUpperCase())}
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button
            onClick={handleSave}
            disabled={!canSave}
            variant="contained"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
