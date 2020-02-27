/**
 * Specifies queries used by the application
 */
import {gql} from 'apollo-boost';

// query transaction details by transaction hash
export const GQL_QUERY_TX_DETAIL = gql`
    query Transaction ($hash: ID!) {
        blockchainTransaction (hash: $hash) {
            hash
            from
            to
            value
            input
            nonce
            fee
            gasLimit
            gasUsed
            gasPrice
            txIndex
            block {
                hash
                number
                timeStamp
            }
        }
    }
`;
