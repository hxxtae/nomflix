import { createRoot } from 'react-dom/client';

import AllProvider from './AllProvider';
import App from './App';

const el = document.getElementById('root');

if (el) {
  const root = createRoot(el);
  root.render(
    <AllProvider>
      <App />
    </AllProvider>
  )
}

console.log('Website by %c https://hxxtae.me ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);
