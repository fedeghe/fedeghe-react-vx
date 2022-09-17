import DefaultGridItem from './../components/DefaultGridItem'


import {
    doThrow, uniqueID, trakTime,
    doWarn, throwIf, warnIf, isFunction
} from '../utils';

import {
    CMPNAME, LIB, GAP, WIDTH, HEIGHT, ITEM_HEIGHT, ITEM_WIDTH,
    RVX_ID, DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
    NO_FILTER_DATA_MESSAGE, GROUP_COMPONENT_HEIGHT,
    UNGROUPED_LABEL, FILTERS, DEFAULT_LOADER, UIE,
    GLOBAL_FILTER, WARNING, MODES, MODE,
} from '../constants';
import { ACTION_TYPES } from './actions';
import ERRORS from './errors';
import WARNS from './warns';



// eslint-disable-next-line one-var
const opts = {lib: LIB},
    actions = {
        [ACTION_TYPES.INIT]: ({config}) => {
            const {
                headers,
                Item,
                data,
                settings: {
                    trackTimes = false,
                    warning = 0,
                    gap = GAP,
                    uie = UIE,
                    mode = MODE,
                    debounceTimes: {
                        scrolling = DEBOUNCE_SCROLLING,
                        filtering = DEBOUNCE_FILTERING
                    } = {}
                } = {}
            } = config;
            opts.warning = warning;

            throwIf({ condition: !headers || !headers?.length, message: ERRORS.NO_HEADERS_PROVIDED.description, opts});
            throwIf({ condition: headers.some(h => !('key' in h)), message: ERRORS.HEADERS_UNKEYED.description, opts});
            throwIf({ condition: !MODES.includes(mode), message: ERRORS.INIT_UNEXPECTED_MODE.description, opts });
            throwIf({ condition: gap < 0, message: ERRORS.GAP_NEGATIVE.description, opts});
            if (warning) {
                warnIf({ condition: mode === 'grid' && !Item, message: WARNS.GRIND_ITEM_NOT_SET.description, opts });
                warnIf({ condition: !data || data.length === 0, message: WARNS.NO_DATA.description, opts });
            }

            return {
                settings: {
                    trackTimes,
                    warning,
                    gap,
                    mode,
                    uie,
                    debounceTimes: {
                        scrolling,
                        filtering,
                    }
                },
                Item: Item || DefaultGridItem,
                headers,
                data,
            };
        },
    },
    reducer = (oldState, action) => {
        const { payload = {}, type } = action,
            { x = null } = oldState,
            {trakTimes, warning} = oldState,

            params = {
                [ACTION_TYPES.INIT]: () => ({config: payload}),

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

    init = cnf => reducer({}, {type: ACTION_TYPES.INIT, payload: cnf});

export default () => ({
    reducer,
    init
});