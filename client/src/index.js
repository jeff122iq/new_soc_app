import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <div className="brightness">
                <div className="background">
                    <App/>
                </div>
            </div>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

