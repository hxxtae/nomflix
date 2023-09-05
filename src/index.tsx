import ReactDOM from 'react-dom';

import AllProvider from './AllProvider';
import App from './App';

ReactDOM.render(
  <>
    <AllProvider>
      <App />
    </AllProvider>
  </>,
  document.getElementById('root')
);

console.log('Website by %c https://hxxtae.me ', `
  font-size: 14px; 
  line-height: 44px;
  color: #e7e7e7;
  background-color: #000000`
);
