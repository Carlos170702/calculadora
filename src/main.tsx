import React from 'react'
import 'animate.css';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
