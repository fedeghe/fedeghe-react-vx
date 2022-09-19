import each from 'jest-each';

import { getLinesNumber, getInitialGroupedData, getAllocation } from '../../../../source/RVX/reducer/utils';
import { getWarnMessage, getTimeSpentMessage } from '../../../../source/RVX/utils';
import WARNS  from '../../../../source/RVX/reducer/warns';

import data from '../../../data/1001.json';
import groups from '../../../groups/group1001';
import { UNGROUPED_LABEL } from '../../../../source/RVX/constants';
import expectedNums from '../../../groups/expected1001';

describe('getAllocation - work as expected', function () {

    const groupLabels = groups.map(g => g.label);

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

    describe('should return the expected:', () => {
        it('grid case - 50%', () => {

            const elementsPerLine = 2,
                mode = 'grid',
                collapsible = true,
                contentHeight = 400,
                headerHeight = 50,
                itemHeight = 100,
                groupedData = getInitialGroupedData({
                    data,
                    grouping: {
                        groups,
                        groupHeader: {
                            Component: () => {},
                            height: 10
                        },
                        ungroupedLabel: UNGROUPED_LABEL,
                        collapsible
                    },
                    elementsPerLine,
                }),
                params = {
                    groupedData,
                    scrollTop : 0,
                    contentHeight,
                    headerHeight,
                    itemHeight,
                    elementsPerLine,
                    mode,
                    opts: {
                        lib: 'my lib',
                        warning: true
                    }
                },
                allocation = getAllocation(params);

            expect(allocation).toBeDefined();
            expect(allocation).toMatchObject({});
        });

    });

});

/* ---------------------------------------------------------------- */

