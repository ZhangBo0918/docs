import { createRoot } from 'react-dom/client';
import { App } from './App';

function renderInBrower() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('根节点不存在');
  }
  createRoot(containerEl).render(<App />);
}

renderInBrower();
