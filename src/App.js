import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./js/store/index";
import MainAppContainer from "./js/components/container/MainAppContainer"


const App = () => {
    return (
        <Provider store={store}>
            <MainAppContainer/>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App/>, document.getElementById("app"));