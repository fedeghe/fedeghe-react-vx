import {
    getLinesNumber,
    getInitialGroupedData
} from '../source/RVX/reducer/utils'
import { generateRowData } from './utils'
import data from './data/1001.json'

describe('getInitialGroupedData - work as expected', function () {
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
    
    it('returns the expected - item 100%', () => {
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
            elementsPerLine = 1,
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
            }),
            groupLabels = groups.map(g => g.label);

        expect('lower' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.lower.lines).toBe(99)
        expect(initialGroupedData.lower.entries.length).toBe(99)

        expect('mid' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.mid.lines).toBe(114)
        expect(initialGroupedData.mid.entries.length).toBe(114)

        expect('high' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.high.lines).toBe(598)
        expect(initialGroupedData.high.entries.length).toBe(598)

        expect(ungroupedLabel in initialGroupedData).toBeTruthy()
        expect(initialGroupedData[ungroupedLabel].lines).toBe(190)
        expect(initialGroupedData[ungroupedLabel].entries.length).toBe(190)
        
        groupLabels.forEach(groupLabel => {
            expect(initialGroupedData[groupLabel].collapsed).toBe(false)
        })
        // expect(true).toBeFalsy()
    });

    it('returns the expected - item 25%', () => {
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
            elementsPerLine = 4,
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
            }),
            groupLabels = groups.map(g => g.label),
            nums = {
                lower: 99,
                mid: 114,
                high: 598,
                [ungroupedLabel]: 190
            };

        expect('lower' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.lower.lines).toBe(getLinesNumber({entriesLength: nums.lower, elementsPerLine}))
        expect(initialGroupedData.lower.entries.length).toBe(nums.lower)

        expect('mid' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.mid.lines).toBe(getLinesNumber({entriesLength: nums.mid, elementsPerLine}))
        expect(initialGroupedData.mid.entries.length).toBe(nums.mid)

        expect('high' in initialGroupedData).toBeTruthy()
        expect(initialGroupedData.high.lines).toBe(getLinesNumber({entriesLength: nums.high, elementsPerLine}))
        expect(initialGroupedData.high.entries.length).toBe(nums.high)

        expect(ungroupedLabel in initialGroupedData).toBeTruthy()
        expect(initialGroupedData[ungroupedLabel].lines).toBe(getLinesNumber({entriesLength: nums[ungroupedLabel], elementsPerLine}))
        expect(initialGroupedData[ungroupedLabel].entries.length).toBe(nums[ungroupedLabel])
        
        groupLabels.forEach(groupLabel => {
            expect(initialGroupedData[groupLabel].collapsed).toBe(false)
        })
        // expect(true).toBeFalsy()
    });


});