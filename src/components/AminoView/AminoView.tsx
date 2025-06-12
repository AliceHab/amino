import Box from '@mui/material/Box'
import { useSnackbar } from 'notistack'
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { COLOR_MAP } from '../../utils/aminoColorMap'

interface AlignmentViewProps {
  seq1: string
  seq2: string
}

/** Визуализация двух аминокислотных последовательностей. Реализован JS‑chunking для деления последовательностей на равные куски */
export default function AlignmentView({
  seq1,
  seq2,
}: AlignmentViewProps) {
  const { enqueueSnackbar } = useSnackbar()
  const containerRef = useRef<HTMLDivElement>(null) // корневой контейнер
  const probeRef = useRef<HTMLSpanElement>(null) // невидимый элемент для измерения ширины символа

  const upper1 = seq1.toUpperCase()
  const upper2 = seq2.toUpperCase()

  const [chunk, setChunk] = useState<number>(upper1.length) // сколько символов вмещается в строку

  //   useLayoutEffect выполняется до отрисовки, поэтому перерисовка более плавнавя чем с useState
  useLayoutEffect(() => {
    function recalc() {
      if (!containerRef.current || !probeRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const charWidth = probeRef.current.getBoundingClientRect().width
      if (charWidth === 0) return

      const fit = Math.floor(containerWidth / charWidth)
      setChunk(fit > 0 ? fit : 1)
    }

    recalc()

    const ro = new ResizeObserver(recalc)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const { rows1, rows2 } = useMemo(() => {
    const sliceBy = (str: string) => {
      const out: string[] = []
      for (let i = 0; i < str.length; i += chunk)
        out.push(str.slice(i, i + chunk))
      return out
    }
    return {
      rows1: sliceBy(upper1),
      rows2: sliceBy(upper2),
    }
  }, [chunk, upper1, upper2])

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return
    if (
      containerRef.current &&
      sel.anchorNode &&
      sel.focusNode &&
      containerRef.current.contains(sel.anchorNode) &&
      containerRef.current.contains(sel.focusNode)
    ) {
      const text = sel.toString().replace(/\s+/g, '')
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          enqueueSnackbar('Последовательность скопирована!', {
            variant: 'info',
          })
        })
      }
      sel.removeAllRanges()
    }
  }, [enqueueSnackbar])

  const renderLine = (
    line: string,
    compare: string,
    isTop: boolean,
    rowIdx: number,
  ) => (
    <Box
      key={`${isTop ? 't' : 'b'}${rowIdx}`}
      component="span"
      sx={{ display: 'inline', overflowWrap: "anywhere" }}
      
    >
      {Array.from(line).map((char, i) => {
        const globalIdx = rowIdx * chunk + i
        const differ = !isTop && char !== compare[globalIdx]
        return (
          <Box
            key={globalIdx}
            component="span"
            sx={{
              px: 0.5,
              borderRadius: 1,
              display: 'inline',
              fontFamily: 'monospace',
              backgroundColor:
                isTop || differ
                  ? COLOR_MAP[char] ?? 'transparent'
                  : 'transparent',
            }}
          >
            {char}
          </Box>
        )
      })}
    </Box>
  )

  return (
    <Box
      ref={containerRef}
      onMouseUp={handleMouseUp}
      sx={{
        mt: 4,
        fontSize: 18,
        lineHeight: 1.4,
        userSelect: 'text',
        cursor: 'text',
        width: '100%',
      }}
    >
      <Box
        ref={probeRef}
        component="span"
        sx={{
          position: 'absolute',
          visibility: 'hidden',
          px: 0.5,
          fontFamily: 'monospace',
        }}
      >
        A
      </Box>

      {rows1.map((_, idx) => (
        <React.Fragment key={idx}>
          {renderLine(rows1[idx], upper1, true, idx)}
          {renderLine(rows2[idx] || '', upper1, false, idx)}
        </React.Fragment>
      ))}
    </Box>
  )
}
