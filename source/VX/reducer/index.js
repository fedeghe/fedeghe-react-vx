
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
import { ACTION_TYPES } from './actions';
import ERRORS from './errors';



// eslint-disable-next-line one-var
const opts = {lib: LIB},
    actions = {
        [ACTION_TYPES.INIT]: ({config}) => {
            const {
                headers = [],
                settings: {
                    trackTimes = false,
                    warning = 0,
                    gap = GAP,
                    mode = MODE,
                    debounceTimes: {
                        scrolling = DEBOUNCE_SCROLLING,
                        filtering = DEBOUNCE_FILTERING
                    } = {}
                } = {}
            } = config;

            throwIf({
                condition:!headers?.length,
                message: ERRORS.NO_HEADERS_PROVIDED.description,
                opts
            });
            throwIf({
                condition:!MODES.includes(mode),
                message: ERRORS.INIT_UNEXPECTED_MODE.description,
                opts
            });

            return {
                settings: {
                    trackTimes,
                    warning,
                    gap,
                    mode,
                    debounceTimes: {
                        scrolling,
                        filtering,
                    }
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
                [ACTION_TYPES.INIT]: () => ({config: payload})
            }[type] || {};

        if (type in actions) {
            const newState = {
                ...oldState,
                ...actions[type](params())
            };

            return newState;
        }
        return oldState;
    },

    init = (cnf = {}) => reducer({}, {type: ACTION_TYPES.INIT, payload: cnf});

export default () => ({
    reducer,
    init
});