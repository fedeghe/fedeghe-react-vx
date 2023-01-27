import testone from '@fedeghe/testone';

const pow = (d, n) => d ** n,
    powN = (d, n) => Math.pow(d, n),
    ios = [{
        in: [2, 3],
        out: 8
    },{
        in: [4, 3],
        out: 64
    },{
        in: (ioIndex, iteration) => {
            return [ioIndex, iteration];
        },
        // in case a function is specified
        // will receive the whole result (+ io index and iteration)
        // and is expected to return true
        out: (r, ioIndex, iteration) => r === ioIndex ** iteration
    }];

describe('test pow', function () {
    it('pow is faster', () => {
        const res = testone(ios, [pow, powN], {iterations: 1e4});
        expect (res.rank[0]).toBe('pow');
    });
});
