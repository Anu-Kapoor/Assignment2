import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/components/store/index'

// import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
