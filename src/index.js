import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider, store } from './Settings';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from 'react-use-cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <CartProvider>
          <Router>
            <QueryClientProvider client={queryClient}> 
              <App />
            </QueryClientProvider>
          </Router>
        </CartProvider>
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);