import each from 'jest-each';

import { getLinesNumber, getInitialGroupedData, getAllocation } from '../../../../source/RVX/reducer/utils';
import { getWarnMessage, getTimeSpentMessage } from '../../../../source/RVX/utils';
import WARNS  from '../../../../source/RVX/reducer/warns';

import { UNGROUPED_LABEL } from '../../../../source/RVX/constants';

import data from '../../../data/1001.json';
import groups from '../../../groups/group1001';
import expectedNums from '../../../groups/expected1001';

describe('getInitialGroupedData - work as expected', function () {
    const ungroupedLabel = 'ungrouped group',
        groupLabels = groups.map(g => g.label);

    let info, warn,
        spyInfo, spyWarn;
    
    beforeEach(() => jest.useFakeTimers("modern"));

    afterEach(() => jest.useRealTimers());

    // mute console info
    beforeAll(() => {
        info = console.info; console.info = jest.fn();
        warn = console.warn; console.warn = jest.fn();
    });
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
        each(
            [[1, 100], [4, 25], [2, 34], [3, 33], [10, 10]]
        // eslint-disable-next-line no-unused-vars
        ).test('returns the expected %d items => %d%', (elementsPerLine, _) => {
            const initialGroupedData = getInitialGroupedData({
                data,
                grouping: {
                    groups,
                    groupHeader: {
                        Component: () => {},
                        height: 10
                    },
                    ungroupedLabel: UNGROUPED_LABEL,
                    collapsible : true
                },
                elementsPerLine,
            });
            groupLabels.forEach(groupLabel => {
                expect(groupLabel in initialGroupedData).toBeTruthy();
                expect(initialGroupedData[groupLabel].lines).toBe(getLinesNumber({entriesLength: expectedNums[groupLabel], elementsPerLine}));
                expect(initialGroupedData[groupLabel].entries.length).toBe(expectedNums[groupLabel]);
                expect(initialGroupedData[groupLabel].collapsed).toBe(false);
            });
        });
    });


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
                    ungroupedLabel: UNGROUPED_LABEL,
                    collapsible : true
                },
                elementsPerLine,
                opts
            });
            expect(spyWarn).toHaveBeenCalledWith(getWarnMessage({
                message: WARNS.OUTKAST_DATA.description,
                params: {num: expectedNums[UNGROUPED_LABEL]},
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
    });


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
            // quite risky since in the example might take more than 0ms :D :D :D FAIL!
            expect(spyInfo).toHaveBeenCalledWith(...getTimeSpentMessage({params: {what: '__getGroupedInit', time: 0}, opts}));
        });
    });
});

/* ---------------------------------------------------------------- */

