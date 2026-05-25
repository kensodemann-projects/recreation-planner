import { afterEach, Mock, vi } from 'vitest';

HTMLDialogElement.prototype.show = vi.fn();
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  (HTMLDialogElement.prototype.show as Mock).mockClear();
  (HTMLDialogElement.prototype.showModal as Mock).mockClear();
  (HTMLDialogElement.prototype.close as Mock).mockClear();
});
