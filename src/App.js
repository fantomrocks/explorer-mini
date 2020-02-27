// libs needed
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

// components used
import Header from './components/header';
import Footer from './components/footer';
import TxContainer from './components/transaction';

// static content to be used
import './style/App.css';

// define the application itself
const App = () => {
    // return the full app render
    return (
        <Router basename="/explorer">
            <div className="fr-app">
                <Header/>

                <main className="fr-content">
                    <div className="fr-content-pane">
                        <Switch>
                            <Route path="/tx">
                                <TxContainer/>
                            </Route>
                            <Route path="*">
                                <div>
                                    <h3>The mini-explorer function you tried to open does not exist.</h3>
                                    <p>
                                        This mini-explorer for Opera block chain content is not intended to be used the way you tried to.
                                        Please visit to our applications on <a href="https://fantom.rocks">Fantom Rocks!</a>
                                </p>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </main>

                <Footer/>
            </div>
        </Router>
    );
};

export default App;
