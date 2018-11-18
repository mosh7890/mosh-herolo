import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./js/store/index";
import AppContainer from "./js/components/container/AppContainer"

const App = () => {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App/>, document.getElementById("app"));