import React from "react";
import ReactDOM from "react-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import store from "./js/store/index";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppContainer from "./js/components/containers/AppContainer"

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <AppContainer/>
            </MuiThemeProvider>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App/>, document.getElementById("app"));