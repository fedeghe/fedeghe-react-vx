
import { generateRowData, getConfig } from './utils';

describe('test utils wor as expected', function () {
    it('returns the expected - generateRowData', () => {
        const data = generateRowData([
            { key: 'id', type: 'int'},
            { key: 's', type: 'str'},
            { key: 'd', type: 'date'},
            { key: 'i', type: 'id'},
            { key: 'c', type: 'company'},
        ], 50);
        expect (data.length).toBe(50);
    });

    it('returns the expected - getConfig', () => {
        const cnf1 = {
                one: [{a:1}]
            },
            cnf2 = getConfig(cnf1);
        cnf1.one[0].a = 2;
        expect(cnf1.one[0].a).toBe(2);
        expect(cnf2.one[0].a).toBe(1);
    });
});