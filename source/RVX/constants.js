import React from 'react';
// the name of the component
export const CMPNAME = 'react-vx',
    LIB = 'react-vx',
    // how many lines extra viewport up and down before virtualization ? 
    GAP = 3,

    // viewPort size
    WIDTH = 1200,
    HEIGHT = 800,

    
    /**
     * item size:
     * in case mode is table only the ITEM_HEIGHT is consumed
     */
    ITEM_HEIGHT = 150,
    ITEM_WIDTH = 200,
    
    // group component height 
    GROUP_COMPONENT_HEIGHT = 20,
    
    // global filter
    GLOBAL_FILTER = ({rowField, globalFilterUserValue}) => `${rowField}`.includes(globalFilterUserValue),
    
    // id appended string
    RVX_ID = '_ID',
    
    // debouning values
    DEBOUNCE_SCROLLING = 50,
    DEBOUNCE_FILTERING = 50,
    
    DEFAULT_LOADER = () => (<div>loading</div>),
    
    // no data message
    NO_FILTER_DATA_MESSAGE = 'no data',
    
    // ungrouped group label
    UNGROUPED_LABEL = 'ungrouped',
    
    // unfilter families
    FILTERS = {
        ALL : 'ALL',
        GLOBAL : 'GLOBAL',
        FIELDS : 'FIELDS',
    },
    MODE = 'table',
    MODES = ['table', 'grid'],
    UIE = 'data-uie';

export default {
    CMPNAME,
    LIB,
    GAP,
    WIDTH,
    HEIGHT,
    ITEM_HEIGHT,
    ITEM_WIDTH,
    GROUP_COMPONENT_HEIGHT,
    GLOBAL_FILTER,
    RVX_ID,
    DEBOUNCE_SCROLLING,
    DEBOUNCE_FILTERING,
    DEFAULT_LOADER,
    NO_FILTER_DATA_MESSAGE,
    UNGROUPED_LABEL,
    FILTERS,
    MODE,
    MODES,
    UIE
};
