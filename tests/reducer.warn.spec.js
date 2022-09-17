/**
 * @jest-environment jsdom
 */
import reducerFactory from '../source/RVX/reducer';
import zeroConfig from './configs/zero';
import REDUCER_WARNS from '../source/RVX/reducer/warns';
import { getWarnMessage } from '../source/RVX/utils.js';

import {
    WIDTH, HEIGHT, ITEM_WIDTH, ITEM_HEIGHT,
    DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
    LIB
} from '../source/RVX/constants';
import { getConfig } from './utils';

const opts = { lib: LIB };

describe('reducer - init - warns the expected', function () {
    const { init } = reducerFactory();
    
    let spy
    
    beforeEach(() => {
        spy = jest.spyOn(console, 'warn');
    });
    
    afterEach(jest.restoreAllMocks);

    it('when `mode` is grid and no Item is given', () => {
        const cnf = getConfig(zeroConfig);
        cnf.settings = {
            mode : 'grid',
            warning: true
        }
        init(cnf);
        expect(spy).toHaveBeenCalledWith(getWarnMessage({
            message: REDUCER_WARNS.GRIND_ITEM_NOT_SET.description,
            opts
        }));

    });
});