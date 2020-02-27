import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import TxDetail from "./txdetail";


// Implements transaction viewer container
const Transaction = () => {
    let match = useRouteMatch();

    // render the container
    return (
        <div className="fr-transaction">
            <Switch>
                <Route path={`${match.path}/:hash`}>
                    <TxDetail/>
                </Route>
                <Route path={match.path}>
                    <h3>Transaction not found</h3>
                    <p>
                        Please provide a valid transaction hash for checking the transaction detail
                        in the Opera chain.
                    </p>
                </Route>
            </Switch>
        </div>
    );
};

export default Transaction;