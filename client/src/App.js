import './App.css'
import Router from "./components/Router.js"
import {StylesProvider} from "@material-ui/core/styles"


function App() {
    return (
        <StylesProvider injectFirst>
            <div className="App">
                <Router/>
            </div>
        </StylesProvider>
    );
}

export default App
