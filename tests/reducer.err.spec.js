/**
 * @jest-environment jsdom
 */
 import reducerFactory from '../source/RVX/reducer'
 import zeroConfig from './configs/zero'
 import REDUCER_ERRORS from '../source/RVX/reducer/errors'
 import {getErrorMessage} from '../source/RVX/utils.js'

 import {
     WIDTH, HEIGHT, ITEM_WIDTH, ITEM_HEIGHT,
     DEBOUNCE_SCROLLING, DEBOUNCE_FILTERING,
     LIB
 }  from '../source/RVX/constants'
 import {getConfig} from './utils'

 const opts = {lib: LIB};
 
 
 
 describe('reducer - init - throws the expected', function () {
     const { init } = reducerFactory();
    
     describe('when `mode` is', () => {
        it('null', () => {
            const cnf = getConfig(zeroConfig)
            cnf.mode = null; // not in MODES
            try{
                init(cnf);
            } catch(e) {
                expect(e).toBe(getErrorMessage({
                    message: REDUCER_ERRORS.INIT_UNEXPECTED_MODE.description,
                    opts
                }))
            }
         });   
         it('empty', () => {
            const cnf = getConfig(zeroConfig)
            cnf.mode = ''; // not in MODES
            try{
                init(cnf);
            } catch(e) {
                expect(e).toBe(getErrorMessage({
                    message: REDUCER_ERRORS.INIT_UNEXPECTED_MODE.description,
                    opts
                }))
            }
         }); 
         it('unexpected', () => {
            const cnf = getConfig(zeroConfig)
            cnf.mode = 'WUN'; // not in MODES
            try{
                init(cnf);
            } catch(e) {
                expect(e).toBe(getErrorMessage({
                    message: REDUCER_ERRORS.INIT_UNEXPECTED_MODE.description,
                    opts
                }))
            }
         });   
     });
     
     describe('when `headers` is', () => {
        it('null', () => {
            const cnf = getConfig(zeroConfig)
            cnf.headers = null; // not in MODES
            try{
                init(cnf);
            } catch(e) {
                expect(e).toBe(getErrorMessage({
                    message: REDUCER_ERRORS.NO_HEADERS_PROVIDED.description,
                    opts
                }))
            }
         });
    
         it('empty', () => {
            const cnf = getConfig(zeroConfig)
            cnf.headers = []; // not in MODES
            try{
                init(cnf);
            } catch(e) {
                expect(e).toBe(getErrorMessage({
                    message: REDUCER_ERRORS.NO_HEADERS_PROVIDED.description,
                    opts
                }))
            }
         });
     });

     
     

     
 
 

 });