import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.tsx'
import {Theme} from "@carbon/react";
import "@carbon/react/index.scss";
import "./assets/index.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
      <Theme theme="g90" style={{height: "100%"}}>
          <React.StrictMode>
              <App />
          </React.StrictMode>
      </Theme>
)
