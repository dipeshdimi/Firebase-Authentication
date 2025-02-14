import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {AuthContextProvider} from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  
	<AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
	</AuthContextProvider>
)
