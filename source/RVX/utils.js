let count = 0;
const prefix = 'RVX_',
    isFunction = f => typeof f === 'function',
    debounce = (func, wait) => {
        let timeout;
        return (...params) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...params);
            }, wait);
        };
    },
    escapeComma = r => `${r}`.replace(/,/g, '\\,'),
    removeID = (jsonData, rxvID) => jsonData.map(row => {
        var r = {...row};
        delete r[rxvID];
        return r;
    }),
    asXsv = (columns, jsonData, rxvID, separator) => {
        const lines = [],
            keys = columns.map(c => c.key);
        lines.push(keys.join(separator));
        removeID(jsonData, rxvID).forEach(row => {
            lines.push(keys.map(k => escapeComma(row[k])).join(separator));
        });
        return lines.join("\n");
    },
    asJson = removeID,

    trakTime = ({ what, time, opts }) => console.info(`%c${opts.lib.toUpperCase()} 🐢 ${what} spent ${time}ms`, 'color:DodgerBlue'),

    doWarn = ({ message, opts }) => opts.warning && console.warn(getWarnMessage({message, opts})),

    doThrow = ({ message, opts }) => {throw getErrorMessage({message, opts});},

    mayWarnIf = ({ condition, message, opts }) => condition && doWarn({message, opts}),

    throwIf = ({ condition, message, opts }) => condition && doThrow({message, opts}),

    getErrorMessage = ({message, opts }) => `${opts.lib.toUpperCase()} 🚨 ${message}`,

    getWarnMessage = ({message, opts }) => `${opts.lib.toUpperCase()} 🙉 ${message}`,

    uniqueID = {
        toString: () => {
            count += 1;
            return prefix + count;
        }
    };
    

export {
    isFunction,
    debounce,
    escapeComma,
    removeID,
    asXsv,
    asJson,
    getErrorMessage,
    getWarnMessage,
    trakTime,
    doWarn, mayWarnIf,
    doThrow, throwIf,
    uniqueID
};
