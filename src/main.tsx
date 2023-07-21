import ReactDOM from 'react-dom/client'
import App from './main/App.tsx'
import {Theme} from "@carbon/react";
import "./assets/index.css";
import "@ibm/plex/scss/ibm-plex.scss"
import '@carbon/react/index.scss'

const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
    <Theme theme={dark ? "g100" : "g10"} style={{minHeight: "100vh"}}>
        <App />
    </Theme>
)
