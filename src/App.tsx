import { useState } from 'react'
import AlignmentForm from './components/AminoInputForm/AminoInputForm'
import AminoView from './components/AminoView/AminoView'
import { Container } from '@mui/material'

function App() {
  const [alignment, setAlignment] = useState<{
    seq1: string
    seq2: string
  } | null>(null)

  const handleSubmit = (values: { seq1: string; seq2: string }) => {
    setAlignment(values)
  }

  return (
    <main>
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          px: 'var(--page-padding-x)',
        }}
      >
        <AlignmentForm onSubmit={handleSubmit} />

        {alignment && (
          <AminoView seq1={alignment.seq1} seq2={alignment.seq2} />
        )}
      </Container>
    </main>
  )
}

export default App
