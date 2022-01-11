import { StrictMode } from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'antd-mobile/es/global';

import { App } from './apps/App';

import './styles/index.less';

render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById('mount-point')
);
