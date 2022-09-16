
import {
    doThrow, uniqueID, trakTime,
    doWarn, throwIf, isFunction
} from './../utils';

import {
    CMPNAME, LIB, GAP, WIDTH, HEIGHT, ITEM_HEIGHT, ITEM_WIDTH,
    RVX_ID, DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
    NO_FILTER_DATA_MESSAGE, GROUP_COMPONENT_HEIGHT,
    UNGROUPED_LABEL, FILTERS, DEFAULT_LOADER, UIE,
    GLOBAL_FILTER, WARNING, MODES, MODE,
} from './../constants';
import ERRORS from './errors'

const INIT = Symbol('initialise');


// eslint-disable-next-line one-var
export const ACTION_TYPES = {
    INIT
};

// eslint-disable-next-line one-var
const opts = {lib: LIB},
    actions = {
        [INIT]: ({config}) => {
            const {
                headers = [],
                settings: {
                    trackTimes = false,
                    warning = 0,
                    gap = GAP,
                    mode = MODE
                } = {}
            } = config;
            
            throwIf({condition:!headers?.length, message: ERRORS.NO_HEADERS_PROVIDED.description, opts});
            throwIf({condition:!MODES.includes(mode), message: ERRORS.INIT_UNEXPECTED_MODE.description, opts});
            return {
                settings: {
                    trackTimes,
                    warning,
                    gap,
                    mode
                },
                headers
            };
        },
    },
    reducer = (oldState, action) => {
        const { payload = {}, type } = action,
            { x = null } = oldState,
            {trakTimes, warning} = oldState,

            params = {
                [INIT]: {config: payload}
            }[type] || {};

        if (type in actions) {
            const newState = {
                ...oldState,
                ...actions[type](params)
            };

            return newState;
        }
        return oldState;
    },

    init = (cnf = {}) => reducer({}, {type: INIT, payload: cnf});

export default () => ({
    reducer,
    init
});