import {
    getLinesNumber,
    getInitialGroupedData,
} from '../source/RVX/reducer/utils'
import {
    getWarnMessage,
    getTimeSpentMessage
} from '../source/RVX/utils'
import WARNS  from '../source/RVX/reducer/warns'
import { generateRowData } from './utils'
import data from './data/1001.json'

describe('getInitialGroupedData - work as expected', function () {
    const ungroupedLabel = 'ungrouped group',
        groups = [{
            label: 'lower',
            grouper: row => row.id <= 100
        },{
            label: 'mid',
            grouper: row => row.id > 100 && row.id <= 200
        },{
            label: 'high',
            grouper: row => row.id > 200 && row.id <= 800
        }],
        nums = {
            lower: 99,
            mid: 114,
            high: 598,
            [ungroupedLabel]: 190
        },
        groupLabels = groups.map(g => g.label);

    let info, warn,
        spyInfo, spyWarn;
    
    beforeEach(() => jest.useFakeTimers("modern"));

    afterEach(() => jest.useRealTimers());

    // mute console info
    beforeAll(() => {
        info = console.info; console.info = jest.fn();
        warn = console.warn; console.warn = jest.fn();
    })    
    afterAll(() => {
        console.info = info;
        console.warn = warn;
    });
    beforeEach(() => {
        spyInfo = jest.spyOn(console, 'info');
        spyWarn = jest.spyOn(console, 'warn');
    });
    afterEach(jest.restoreAllMocks);

    describe('the two common mode driven cases', () => {
    
        it('returns the expected - item 100% - table', () => {
            const elementsPerLine = 1,
                initialGroupedData = getInitialGroupedData({
                    data,
                    grouping: {
                        groups,
                        groupHeader: {
                            Component: () => {},
                            height: 10
                        },
                        ungroupedLabel,
                        collapsible : true
                    },
                    elementsPerLine,
                });

            groupLabels.forEach(groupLabel => {
                expect(groupLabel in initialGroupedData).toBeTruthy()
                expect(nums[groupLabel]).toBe(getLinesNumber({entriesLength: nums[groupLabel], elementsPerLine}))
                expect(initialGroupedData[groupLabel].lines).toBe(nums[groupLabel])
                expect(initialGroupedData[groupLabel].entries.length).toBe(nums[groupLabel])
                expect(initialGroupedData[groupLabel].collapsed).toBe(false)
            });
        });

        it('returns the expected - item 25% - grid', () => {
            const elementsPerLine = 4,
                initialGroupedData = getInitialGroupedData({
                    data,
                    grouping: {
                        groups,
                        groupHeader: {
                            Component: () => {},
                            height: 10
                        },
                        ungroupedLabel,
                        collapsible : true
                    },
                    elementsPerLine,
                });
            
            groupLabels.forEach(groupLabel => {
                expect(groupLabel in initialGroupedData).toBeTruthy()
                expect(initialGroupedData[groupLabel].lines).toBe(getLinesNumber({entriesLength: nums[groupLabel], elementsPerLine}))
                expect(initialGroupedData[groupLabel].entries.length).toBe(nums[groupLabel])
                expect(initialGroupedData[groupLabel].collapsed).toBe(false)
            });
        });
    })

    describe('should warn when warning flag is active and:', () => {

        it('some elements are out', () => {
            const elementsPerLine = 4,
                opts = {
                    lib: 'my lib',
                    warning: true
                };

            getInitialGroupedData({
                data,
                grouping: {
                    groups,
                    groupHeader: {
                        Component: () => {},
                        height: 10
                    },
                    ungroupedLabel,
                    collapsible : true
                },
                elementsPerLine,
                opts
            });
        
            expect(spyWarn).toHaveBeenCalledWith(getWarnMessage({
                message: WARNS.OUTKAST_DATA.description,
                params: {num: nums[ungroupedLabel]},
                opts
            }));
        });

        it('a group is empty', () => {
            const elementsPerLine = 4,
                opts = {
                    lib: 'my lib',
                    warning: true
                },
                impossibleGroupName = 'impossible';

            getInitialGroupedData({
                data,
                grouping: {
                    groups: [
                        ...groups,
                        {
                            label: impossibleGroupName,
                            grouper: row => row.id > Infinity
                        }
                    ],
                    groupHeader: {
                        Component: () => {},
                        height: 10
                    },
                    ungroupedLabel,
                    collapsible : true
                },
                elementsPerLine,
                opts
            });
        
            expect(spyWarn).toHaveBeenCalledWith(getWarnMessage({
                message: WARNS.EMPTY_GROUP.description,
                params: {groupName: impossibleGroupName},
                opts
            }));
        });
    })

    describe('should trak times when trakTimes flag is active:', () => {

        it('tracks time as expected', () => {
            const elementsPerLine = 4,
                opts = {
                    lib: 'my lib',
                    warning: true,
                    trakTimes: true
                };

            getInitialGroupedData({
                data,
                grouping: {
                    groups,
                    groupHeader: {
                        Component: () => {},
                        height: 10
                    },
                    ungroupedLabel,
                    collapsible : true
                },
                elementsPerLine,
                opts
            });
        
            expect(spyInfo).toHaveBeenCalledTimes(1);
            // this is risky since in the example might take more than 0ms :D :D :D 
            expect(spyInfo).toHaveBeenCalledWith(...getTimeSpentMessage({params: {what: '__getGroupedInit', time: 0}, opts}))
        });

    })


});