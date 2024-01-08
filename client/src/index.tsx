import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store'
import App from './components/App/App'
import './styles/index.css'
import './styles/normalize.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
