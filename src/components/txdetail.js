import React from 'react';
import Moment from 'moment';
import {useQuery} from '@apollo/react-hooks';
import {GQL_QUERY_TX_DETAIL} from '../schema/queries';
import {useParams} from 'react-router-dom';
import {formatWeiToFtm, toAscii} from '../lib/units';

import spinner from '../images/cogs_spinner.svg';

// settings
const TX_POLL_INTERVAL = 200;
const TX_STOP_POLL_AFTER = 60000;

// implements detail of Transaction loaded by the transaction hash
const TxDetail = () => {
    // get the dynamic piece of the URL by a hook
    let {hash} = useParams();

    // get the transaction detail if possible
    const {loading, error, data, stopPolling} = useQuery(GQL_QUERY_TX_DETAIL, {
        variables: {
            hash: hash
        },
        errorPolicy: 'all',
        pollInterval: TX_POLL_INTERVAL
    });

    setTimeout(() => {
        stopPolling();
    }, TX_STOP_POLL_AFTER);

    // what to render on loading
    const BoxError = () => (
        <div className="fr-info">
            Can not load requested transaction, your transaction hash could not be decoded.
        </div>
    );

    // error detected?
    if (error) {
        console.log("Fatal Error!!!!", error);
    }

    // what to render on loading
    const BoxLoading = () => (
        <div className="fr-info">
            Loading transaction ...
        </div>
    );

    // render OK status
    const StatusOk = () => (
            <div className="fr-status-box fr-status-ok">
                success
            </div>
    );

    // render Processing/Pending status
    const StatusPending = () => (
        <div className="fr-status-box fr-status-pending">
            <img src={spinner}/>
            <span>pending</span>
        </div>
    );

    // what to render on finalized transaction
    const BoxBlock = (params) => {
        const ts = Moment(params.tx.block.timeStamp);
        return (
            <div className="fr-option-group">
                <p className="fr-option">
                    <div className="fr-label fr-tooltip">Time Stamp</div>
                    <div className="fr-value"><span>{ts.fromNow()}</span> <span className="fr-time-exact">({ts.format("dddd, MMMM Do YYYY, h:mm:ss a")})</span></div>
                </p>

                <p className="fr-option">
                    <div className="fr-label fr-tooltip">Transaction Fee (FTM)</div>
                    <div className="fr-value">{formatWeiToFtm(params.tx.fee)}</div>
                </p>

                <p className="fr-option">
                    <div className="fr-label fr-tooltip">Block Number</div>
                    <div className="fr-value">{params.tx.block.number}</div>
                </p>

                <p className="fr-option">
                    <div className="fr-label fr-tooltip">Gas Used</div>
                    <div className="fr-value">{params.tx.gasUsed}</div>
                </p>
            </div>)
    };


    // what to render as data
    const BoxData = (params) => {
        const text = toAscii(params.tx.input);
        return (
            <div>
                <div className="fr-option-group">
                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Transaction Hash</div>
                        <div className="fr-value fr-address"><span>{params.tx.hash}</span></div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Status</div>
                        <div className="fr-value">{params.tx.block ? <StatusOk/> : <StatusPending/>}</div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Sender</div>
                        <div className="fr-value fr-address"><span>{params.tx.from}</span></div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Recipient</div>
                        <div className="fr-value fr-address"><span>{params.tx.to}</span></div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Amount (FTM)</div>
                        <div className="fr-value">{formatWeiToFtm(params.tx.value)}</div>
                    </p>
                </div>

                {params.tx.block ? <BoxBlock tx={params.tx}/> : ''}

                <div className="fr-option-group">
                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Gas Limit</div>
                        <div className="fr-value">{params.tx.gasLimit}</div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Gas Price (WEI)</div>
                        <div className="fr-value">{params.tx.gasPrice}</div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Nonce</div>
                        <div className="fr-value">{params.tx.nonce}</div>
                    </p>

                    <p className="fr-option">
                        <div className="fr-label fr-tooltip">Input Data</div>
                        <div className="fr-value fr-text">
                            {0 > text.length ? text : <span className="fr-no-text">No data attached.</span>}
                        </div>
                    </p>
                </div>
            </div>
        );
    };

    // return the renderer
    return (
        <div className="fr-transaction">
            <h3>Transaction detail</h3>
            {error ? <BoxError/> : (loading ? <BoxLoading/> : <BoxData tx={data.blockchainTransaction}/>)}
        </div>
    );
};

export default TxDetail;
