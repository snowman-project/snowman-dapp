import { StrictMode } from 'react';
import { render } from 'react-dom';

import 'antd-mobile/es/global';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { HashRouter } from 'react-router-dom';

import { App } from './apps/App';

import './styles/index.less';

dayjs.extend(localizedFormat);
dayjs.locale('zh-cn');

render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
  document.getElementById('mount-point')
);
