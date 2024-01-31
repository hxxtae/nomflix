import { createRoot } from 'react-dom/client';

import AllProvider from './AllProvider';
import App from './App';

const img = new Image();
img.src = `${process.env.PUBLIC_URL}/assets/svg/netflix_logo.svg`;


const el = document.getElementById('root');

if (el) {
  const root = createRoot(el);
  root.render(
    <AllProvider>
      <App />
    </AllProvider>
  )
}

console.log('Website by %c https://heetae.dev ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);
