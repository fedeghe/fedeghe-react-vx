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

    trakTime = ({ what, time, opts }) => console.info(...getTimeSpentMessage({params: {what, time}, opts})),

    doWarn = ({ message, params = {}, opts }) => opts.warning && console.warn(getWarnMessage({message, params, opts})),

    doThrow = ({ message, params = {}, opts }) => {throw getErrorMessage({message, params, opts});},

    mayWarnIf = ({ condition, message, params = {}, opts }) => condition && doWarn({message, params, opts}),

    throwIf = ({ condition, message, params = {}, opts }) => condition && doThrow({message, params, opts}),

    getErrorMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🚨 ${paramsMessage({message, params})}`,

    getWarnMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🙉 ${paramsMessage({message, params})}`,

    getTimeSpentMessage = ({params = {what:'not specified', time: 'not specified'}, opts }) => ([
        `%c${opts.lib.toUpperCase()} 🐢 ${paramsMessage({message: '%what% spent %time% ms', params})}`,
        'color:DodgerBlue'
    ]),

    paramsMessage = ({message, params = {}, leaveUnmatching = false}) =>
        Object.entries(params).reduce(
            (acc, [seek, rep]) => acc.replace(new RegExp('%' + seek + '%', 'g'), rep)
        , message)
        .replace(/%([A-z,0-9,_,-]*)%/, (_, $1) => leaveUnmatching ? $1 : ''),

    paramsMessage2 = ({message, params = {}, leaveUnmatching = false}) => {
        let msg = message;
        for(let mk in params) {
            // eslint-disable-next-line no-prototype-builtins
                msg = msg.replace(new RegExp('%' + mk + '%', 'g'), params[mk]);
        }
        return msg.replace(/%([A-z,0-9,_,-]*)%/, (_, $1) => leaveUnmatching ? $1 : '');
    },

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
    getTimeSpentMessage,
    paramsMessage,
    paramsMessage2,
    trakTime,
    doWarn, mayWarnIf,
    doThrow, throwIf,
    uniqueID
};
