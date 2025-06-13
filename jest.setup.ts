import '@testing-library/jest-dom';
import { jest } from '@jest/globals'

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = MockResizeObserver;

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn(),
  }),
}));
