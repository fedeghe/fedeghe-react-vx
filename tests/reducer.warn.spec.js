/**
 * @jest-environment jsdom
 */
import reducerFactory from '../source/RVX/reducer';
import zeroConfig from './configs/zero';
import WARNS from '../source/RVX/reducer/warns';
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
    let warn, spy;

    // mute console warn
    beforeAll(() => {warn = console.warn; console.warn = jest.fn();})    
    afterAll(() => {console.warn = warn; });
    
    
    beforeEach(() => {spy = jest.spyOn(console, 'warn');});
    afterEach(jest.restoreAllMocks);

    it('when `mode` is grid and no Item is given', () => {
        const cnf = getConfig(zeroConfig);
        cnf.settings = {
            mode : 'grid',
            warning: true
        }
        init(cnf);
        expect(spy).toHaveBeenCalledWith(getWarnMessage({
            message: WARNS.GRIND_ITEM_NOT_SET.description,
            opts
        }));

    });

    it('when `data` not passed', () => {
        const cnf = getConfig(zeroConfig);
        cnf.settings = {
            warning: true
        }
        delete cnf.data
        init(cnf);
        expect(spy).toHaveBeenCalledWith(getWarnMessage({
            message: WARNS.NO_DATA.description,
            opts
        }));

    });
    it('when `data` is empty', () => {
        const cnf = getConfig(zeroConfig);
        cnf.settings = {
            warning: true
        }
        cnf.data = []
        init(cnf);
        expect(spy).toHaveBeenCalledWith(getWarnMessage({
            message: WARNS.NO_DATA.description,
            opts
        }));

    });
    
});