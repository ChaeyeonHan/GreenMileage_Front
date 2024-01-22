import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.web'
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app"));
root.render(<App />);