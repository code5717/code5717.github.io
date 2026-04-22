import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __showToast?: (msg: string) => void;
  }
}

export default function Toast() {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    window.__showToast = (message: string) => {
      setMsg(message);
      setShow(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setShow(false), 2200);
    };
    return () => {
      if (timer) window.clearTimeout(timer);
      delete window.__showToast;
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-5 bottom-5 z-50 rounded-full px-4 py-2.5 bg-ink-400/90 border border-cyan-400/30 text-cyan-200 text-sm backdrop-blur shadow-[0_16px_40px_-14px_rgba(0,0,0,0.65)] transition-all duration-200 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      {msg}
    </div>
  );
}
