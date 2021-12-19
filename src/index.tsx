import { render } from 'react-dom';
import 'antd-mobile/es/global';

import { App } from './apps/App';

import './styles/index.less';

render(<App />, document.getElementById('mount-point'));
