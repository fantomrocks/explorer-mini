/**
 * Exports usual Fantom units and their conversion
 */

// how many WEIs are in single FTM token
export const WEI_IN_FTM = 1000000000000000000;


/**
 * Convert WEI value to FTM
 *
 * @param {number} value
 * @returns {number}
 */
export function weiToFtm(value) {
    return value / WEI_IN_FTM;
}

/**
 * Convert WEI value to FTM and return formatted string
 *
 * @param {number} value
 * @returns {string}
 */
export function formatWeiToFtm(value) {
    return (Math.round((value / WEI_IN_FTM) * 100000000) / 100000000).toFixed(8);
}

/**
 * Convert FTM value to WEI for sending
 *
 * @param {number} value
 * @returns {number}
 */
export function ftmToWei(value) {
    return value * WEI_IN_FTM;
}

/**
 * Try to parse input data
 * @param input
 */
export function toAscii(input) {
    let str = "";
    let ix = (input.substring(0, 2) === '0x' ? 2 : 0)
    let len = input.length;

    for (; ix < len; ix+=2) {
        const code = parseInt(input.substr(ix, 2), 16);
        if ((33 > code) || (125 < code)) {
            return input;
        }
        str += String.fromCharCode(code);
    }

    return str;
}
