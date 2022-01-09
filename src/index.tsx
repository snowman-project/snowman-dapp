import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd-mobile/es/global';

import { App } from './apps/App';

import './styles/index.less';

render(
  <StrictMode>
    <BrowserRouter basename="/snowman-dapp">
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('mount-point')
);
