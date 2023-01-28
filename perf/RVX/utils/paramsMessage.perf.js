import testone from '@fedeghe/testone';
import { paramsMessage, paramsMessage2 } from '../../../source/RVX/utils';

const ios = [{
    in: [{
        message: 'this is just %message%',
        params: { message: 'a message' }
    }],
    out: 'this is just a message'
},{
    in: [{
        message: '%a% %a% %b% %b% %c% %c% %d% %d%',
        params: { a: 'a', b: 'b', c: 'c', d: 'd', }
    }],
    out: 'a a b b c c d d'
}];

describe('test paramsMessage', function () {
    it('paramsMessage2 is faster (most of the times)', () => {
        const res = testone(
            ios,
            [paramsMessage, paramsMessage2]
        ),

            { name } = Object.entries(res.fx)
                .reduce(
                    (acc, [k, v]) => {
                        if (v < acc.value) {
                            acc.name = k;
                            acc.value = v;
                        }
                        return acc;
                    }, { name: "", value: Infinity });

        // console.log(JSON.stringify(res, null, 2))
        expect(name).toBe('paramsMessage2');
        expect(res.rank.length).toBe(2);
    });
});
