/**
 * @jest-environment jsdom
 */
 import reducerFactory from '../../../source/RVX/reducer';
 import zeroConfig from '../../configs/zero';
 import ERRORS from '../../../source/RVX/reducer/errors';
 import {getErrorMessage} from '../../../source/RVX/utils.js';

 import {
     LIB
 }  from '../../../source/RVX/constants';
 import {getConfig} from '../../utils';

 const opts = {lib: LIB};
 
 
 describe('reducer - init - throws the expected', function () {
     const { init, reducer } = reducerFactory();
    
     describe('when `layout` is', () => {
        it('null', () => {
            const cnf = getConfig(zeroConfig);
            cnf.settings = { layout: null}; // not in LAYOUTS
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.INIT_UNEXPECTED_LAYOUT.description,
                    opts
                }));
            }
         });   
         it('empty', () => {
            const cnf = getConfig(zeroConfig);
            cnf.settings = {layout: ''}; // not in LAYOUTS
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.INIT_UNEXPECTED_LAYOUT.description,
                    opts
                }));
            }
         }); 
         it('unexpected', () => {
            const cnf = getConfig(zeroConfig);
            cnf.settings = { layout: 'WUN'}; // not in LAYOUTS
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.INIT_UNEXPECTED_LAYOUT.description,
                    opts
                }));
            }
         });   
     });     
     describe('when `headers`', () => {
        it('is null', () => {
            const cnf = getConfig(zeroConfig);
            delete cnf.headers;
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.NO_HEADERS_PROVIDED.description,
                    opts
                }));
            }
         });
    
         it('is empty', () => {
            const cnf = getConfig(zeroConfig);
            cnf.headers = []; // not in LAYOUTS
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.NO_HEADERS_PROVIDED.description,
                    opts
                }));
            }
         });

         it('contains at least one header without the key', () => {
            const cnf = getConfig(zeroConfig);
            delete cnf.headers[0].key;
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.HEADERS_UNKEYED.description,
                    opts
                }));
            }
         });
     });
     describe('when `gap` is', () => {
        it('negative', () => {
            const cnf = getConfig(zeroConfig);
            cnf.settings = {gap: -1};
            try {
                init(cnf);
                // it must throw and not reach the following line
                // where the test will correctly fail
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.GAP_NEGATIVE.description,
                    opts
                }));
            }
         });
    
     });
     describe('when `action`', () => {
        it('has no type', () => {
            const cnf = getConfig(zeroConfig);
            try {
                const state = init(cnf);
                reducer(state, {});
            } catch (e) {
                expect(e).toBe(getErrorMessage({
                    message: ERRORS.REDUCER_NO_TYPE_IN_ACTION.description,
                    opts
                }));
            }
         });
    
     });
 

 });