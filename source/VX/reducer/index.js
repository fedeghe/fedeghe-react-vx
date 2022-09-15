
import {
    doThrow, uniqueID, trakTime,
    doWarn, throwIf, isFunction
} from './../utils';

import {
    CMPNAME, GAP, WIDTH, HEIGHT, ITEM_HEIGHT, ITEM_WIDTH,
    RVX_ID, DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
    NO_FILTER_DATA_MESSAGE, GROUP_COMPONENT_HEIGHT,
    UNGROUPED_LABEL, FILTERS, DEFAULT_LOADER, UIE,
    GLOBAL_FILTER, WARNING, MODES,
} from './../constants';

const INIT = Symbol('initialise')


// eslint-disable-next-line one-var
export const ACTION_TYPES = {
    INIT
};

// eslint-disable-next-line one-var
const actions = {
        [INIT]: ({config}) => {
            const {
                trackTimes = false,
                warning = 0,
                headers,
                gap = GAP
            } = config;
            return {
                settings: {
                    trackTimes,
                    warning,
                    gap
                },
                headers
            }
        },
    },
    lib = CMPNAME,
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