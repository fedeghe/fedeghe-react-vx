/**
 * @jest-environment jsdom
 */
 import reducerFactory from '../../../source/RVX/reducer';
 import zeroConfig from '../../configs/zero';

 
 describe('reducer - basic', function () {
     const { init, reducer } = reducerFactory();
 
     it('initialise as expected - basic defaulted initialization', () => {
        const state = init(zeroConfig);
        expect(state.settings).toMatchObject({
            trackTimes: false,
            warning: 0,
            gap: 3,
            mode: 'table',
        });
        expect(state.settings.debounceTimes).toMatchObject({
            scrolling: 50,
            filtering: 50,
        });
        expect(state.headers.length).toBe(3);
     });

     it('does nothing on unexpected action type', () => {
        const state = init(zeroConfig),
            newState = reducer(state, {type: 'not expected action type'});
        expect(JSON.stringify(newState)).toBe(JSON.stringify(newState));
     });
 });