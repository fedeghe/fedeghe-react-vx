import React from 'react'
import CONSTANTS from '../../source/RVX/constants'
const {
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
    LAYOUT,
    LAYOUTS,
    UIE
} = CONSTANTS;

describe('contants contains', function () {

    it(' the expected values', () => {
        expect(LIB).toBe('react-vx');
        expect(CMPNAME).toBe('react-vx');
        expect(GAP).toBe(3);
        expect(WIDTH).toBe(1200);
        expect(HEIGHT).toBe(800);
        expect(ITEM_WIDTH).toBe(200);
        expect(ITEM_HEIGHT).toBe(150);
        expect(GROUP_COMPONENT_HEIGHT).toBe(20);
        expect(RVX_ID).toBe('_ID');
        expect(DEBOUNCE_SCROLLING).toBe(50);
        expect(DEBOUNCE_FILTERING).toBe(50);
        expect(NO_FILTER_DATA_MESSAGE).toBe('no data');
        expect(UNGROUPED_LABEL).toBe('ungrouped');
        expect(FILTERS).toMatchObject({
            ALL : 'ALL',
            GLOBAL : 'GLOBAL',
            FIELDS : 'FIELDS',
        });
        expect(LAYOUT).toBe(LAYOUTS.TABLELAYOUT);
        expect(LAYOUTS).toMatchObject({});
        expect(UIE).toBe('data-uie');
    });

    it(' GLOBAL_FILTER -returns the expected ', () => {
        expect(GLOBAL_FILTER({
            rowField:'sfsdfsd aa asas aaa fsdfsd',
            globalFilterUserValue: 'aaa'
        })).toBeTruthy();
        expect(GLOBAL_FILTER({
            rowField:'aaasfsdfsd aa asa fsdfsd',
            globalFilterUserValue: 'aaa'
        })).toBeTruthy();
        expect(GLOBAL_FILTER({
            rowField:'sfsdfsd aa asa fsdfsdaaa',
            globalFilterUserValue: 'aaa'
        })).toBeTruthy();
        expect(GLOBAL_FILTER({
            rowField:'sfsdfsd aa asa fsdfsd',
            globalFilterUserValue: 'aaa'
        })).toBeFalsy();
    })

    it(' DEFAULT_LOADER -returns the expected ', () => {
        expect(DEFAULT_LOADER()).toMatchObject(<div>loading</div>);
    })

});