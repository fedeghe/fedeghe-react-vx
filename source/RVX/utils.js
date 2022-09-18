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

    doWarn = ({ message, params = {}, opts }) => opts.warning && console.warn(getWarnMessage({message, params, opts})),

    doThrow = ({ message, params = {}, opts }) => {throw getErrorMessage({message, params, opts});},

    mayWarnIf = ({ condition, message, params = {}, opts }) => condition && doWarn({message, params, opts}),

    throwIf = ({ condition, message, params = {}, opts }) => condition && doThrow({message, params, opts}),

    getErrorMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🚨 ${paramsMessage({message, params})}`,

    getWarnMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🙉 ${paramsMessage({message, params})}`,

    paramsMessage = ({message, params = {}, leaveUnmatching = false}) =>
        Object.entries(params).reduce(
            (acc, [seek, rep]) => acc.replace(new RegExp('%' + seek + '%', 'g'), rep)
        , message)
        .replace(/%([A-z,0-9,_,-]*)%/, (_, $1) => leaveUnmatching ? $1 : ''),

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
    paramsMessage,
    trakTime,
    doWarn, mayWarnIf,
    doThrow, throwIf,
    uniqueID
};
