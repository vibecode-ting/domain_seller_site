// Safety shim for browser/iframe environments where Window has only a getter for fetch
try {
  const current = window.fetch;
  let activeFetch = typeof current === 'function' ? current.bind(window) : current;
  Object.defineProperty(window, 'fetch', {
    get() {
      return activeFetch;
    },
    set(fn) {
      activeFetch = fn;
    },
    configurable: true,
    enumerable: true,
  });
} catch (_) {
  // Ignore if already properly defined
}

// Safety shim for WeChat webviews / mobile extensions looking for wx.miniProgram
try {
  const mockMini = {
    getEnv: (cb: (res: { miniprogram: boolean }) => void) => {
      if (typeof cb === 'function') cb({ miniprogram: false });
    },
    navigateBack: () => {},
    navigateTo: () => {},
    redirectTo: () => {},
    switchTab: () => {},
    reLaunch: () => {},
    postMessage: () => {},
  };
  const win = window as any;
  if (!win.wx) {
    win.wx = { miniProgram: mockMini };
  } else if (!win.wx.miniProgram) {
    win.wx.miniProgram = mockMini;
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
