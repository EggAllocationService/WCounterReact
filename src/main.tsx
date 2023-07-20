import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.tsx'
import {Theme} from "@carbon/react";
import "./assets/index.css";
import "@ibm/plex/scss/ibm-plex.scss"
import '@carbon/react/index.scss'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
      <Theme theme="g90" style={{minHeight: "100vh"}}>
          <React.StrictMode>
              <App />
          </React.StrictMode>
      </Theme>
)
