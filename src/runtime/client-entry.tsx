import { createRoot } from 'react-dom/client';
import { App } from './App';
import siteData from 'island:site-data';
import { BrowserRouter } from 'react-router-dom';

function renderInBrower() {
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('根节点不存在');
  }
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  console.log(siteData);
}

renderInBrower();
