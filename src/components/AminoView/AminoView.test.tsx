import { render } from '@testing-library/react'
import AminoView from './AminoView'

const SEQ1 = 'AAA'
const SEQ2 = 'AAG'

// игнор невидимого элемента для измерения ширины символа
function getVisibleSpans(container: HTMLElement) {
  return Array.from(container.querySelectorAll('span')).filter(
    (el) =>
      window.getComputedStyle(el).visibility !== 'hidden' &&
      el.querySelector('span') === null,
  )
}

describe('AminoView', () => {
  it('проверка подсветки отличий и кол-ва символов', () => {
    const { container } = render(
      <AminoView seq1={SEQ1} seq2={SEQ2} />,
    )

    const spans = getVisibleSpans(container)
    expect(spans).toHaveLength(SEQ1.length + SEQ2.length)

    const bottomThird = spans[SEQ1.length + 2]

    expect(bottomThird).not.toHaveStyle(
      'background-color: transparent',
    )
  })
})
