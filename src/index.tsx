import { StrictMode } from 'react';
import { render } from 'react-dom';
import 'antd-mobile/es/global';

import { App } from './apps/App';

import './styles/index.less';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('mount-point')
);
