const INIT = Symbol('initialise'),
    LOADING =  Symbol('loading'),
    UNFILTER_FIELDS =  Symbol('unfilter all fields or  some'),
    FILTER =  Symbol('apply all filters'),
    UNFILTER =  Symbol('unfilter global or all'),
    TOGGLE_GROUP =  Symbol('toggle one group'),
    TOGGLE_GROUPS =  Symbol('toggle all groups'),
    SCROLL =  Symbol('scroll'),
    
    TOGGLE_COLUMN_VISIBILITY = Symbol('toggle a table column visibility'),
    SORT = Symbol('sort per column(table) or group(grid)'),
    UNSORT = Symbol('unsort column(table) or group(grid)'),
    CELL_ENTER = Symbol('table layout: enter a cell'),
    CELL_LEAVE = Symbol('table layout: leave a cell');


// eslint-disable-next-line one-var
export const ACTION_TYPES = {
    INIT,
    LOADING,
    FILTER,
    UNFILTER_FIELDS,
    UNFILTER,
    TOGGLE_GROUP,
    TOGGLE_GROUPS,
    TOGGLE_COLUMN_VISIBILITY,
    SORT,
    UNSORT,
    CELL_ENTER,
    CELL_LEAVE,
    SCROLL
};