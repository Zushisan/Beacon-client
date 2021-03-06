import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'


import './styles/application.css'
import './styles/diary.css'

import registerServiceWorker from './registerServiceWorker'
import App from './components/App'

// Load up the application styles
// require("./styles/application.scss");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()