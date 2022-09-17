
import {
    isFunction,
    debounce,
    escapeComma,
    removeID,
    asXsv,
    asJson,
    getErrorMessage,
    getWarnMessage,
    trakTime,
    doWarn, warnIf,
    doThrow, throwIf,
    uniqueID
} from '../source/RVX/utils'



describe('utils functions work as expected', function () {
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
    
    it('isFunction', () => {
        const funcs = [
            () => { },
            function s() { },
            function () { }
        ]
        funcs.forEach(f => expect(isFunction(f)).toBeTruthy())
        const unfuncs = [
            1,
            true,
            'hello',
            Symbol('hi'),
            null,
        ]
        unfuncs.forEach(f => expect(isFunction(f)).toBeFalsy())
    });

    it('debounce', () => {
        let y = 0
        const r = debounce(v => { y = v }, 200);
        r(10);
        expect(y).toBe(0);
        r(20);
        expect(y).toBe(0);
        jest.advanceTimersByTime(100);
        expect(y).toBe(0);
        jest.advanceTimersByTime(200);
        expect(y).toBe(20);
    });

    it('removeID', () => {
        const e = [
            {id:1, name:'Federico'},
            {id:2, name:'Corrado'}
        ]
        expect(removeID(e, 'id')).toMatchObject([{name:'Federico'},{name:'Corrado'}])
    });

    it('asXsv', () => {
        const e = [
            {id:1, name:'Federico', surname: 'Ghedina', _ID: 321423},
            {id:2, name:'Corrado', surname: 'Crepo', _ID: 545632}
        ]
        expect(asXsv([{key:'id'}, {key: 'surname'}], e, '_ID', '|')).toBe(`id|surname\n1|Ghedina\n2|Crepo`)
        expect(asXsv([{key:'name'},{key:'id'}, {key: 'surname'}], e, '_ID', '|')).toBe(`name|id|surname\nFederico|1|Ghedina\nCorrado|2|Crepo`)
        expect(asXsv([{key:'id'}, {key: 'surname'},{key:'name'}], e, '_ID', '|')).toBe(`id|surname|name\n1|Ghedina|Federico\n2|Crepo|Corrado`)
    });

    it('asJson', () => {
        const e = [
            {id:1, name:'Federico'},
            {id:2, name:'Corrado'}
        ]
        expect(asJson(e, 'id')).toMatchObject([{name:'Federico'},{name:'Corrado'}])
    });

    it('trakTime', () => {
        trakTime({what: 'methodX', time: 123, opts:{lib:'mylib'}})
        expect(spyInfo).toHaveBeenLastCalledWith("%cMYLIB 🐢 methodX spent 123ms", "color:DodgerBlue");
    });

    it('doWarn - warning active/inactive', () => {
        doWarn({message: 'watch out', opts: {lib:'mylib', warning: true}})
        expect(spyWarn).toHaveBeenLastCalledWith("MYLIB 🙉 watch out");
        expect(spyWarn).toBeCalledTimes(1)
    
        doWarn({message: 'watch in', opts: {lib:'mylib'}})
        expect(spyWarn).toHaveBeenLastCalledWith("MYLIB 🙉 watch out");
    });

    it('doThrow', () => {
        try {
            doThrow({message: 'throwing error', opts: {lib:'mylib'}})
            expect(true).toBeFalsy();
        } catch (e) {
            expect(e).toBe('MYLIB 🚨 throwing error')
        }
    });
    it('warnIf - warning active/inactive', () => {
        warnIf({condition: true, message: 'watch your back', opts: {lib: 'mylib', warning: true}});
        expect(spyWarn).toHaveBeenLastCalledWith("MYLIB 🙉 watch your back");

        warnIf({condition: true, message: 'watch my back', opts: {lib: 'mylib'}});
        expect(spyWarn).toHaveBeenLastCalledWith("MYLIB 🙉 watch your back");
    });
    it('throwIf - condition true/false', () => {
        try {
            throwIf({condition: true, message: 'throwing error', opts: {lib:'mylib'}})
            expect(true).toBeFalsy();
        } catch (e) {
            expect(e).toBe('MYLIB 🚨 throwing error')
        }
        try {
            throwIf({condition: false, message: 'throwing error', opts: {lib:'mylib'}})
            expect(true).toBeTruthy();
        } catch (e) {
            expect(true).toBeFalsy();
        }
    });
    it('getErrorMessage', () => {
        expect(getErrorMessage({ message: 'throwing many errors', opts: {lib:'mylib'}})).toBe('MYLIB 🚨 throwing many errors');
    });
    it('getWarnMessage', () => {
        expect(getWarnMessage({ message: 'warning a lot', opts: {lib:'mylib'}})).toBe('MYLIB 🙉 warning a lot');
    });

    it('escapeComma', () => {
        const e = {
            in:[',', ',,', 'a,b,c', '', 'ciao.ciao'],
            out:['\\,', '\\,\\,', 'a\\,b\\,c', '', 'ciao.ciao'],
        }
        e.in.forEach((c, i) => expect(escapeComma(c)).toBe(e.out[i]))
    });

    it('uniqueID', () => {
        expect(`${uniqueID}`).toBe('RVX_1')
        expect(`${uniqueID}`).toBe('RVX_2')
        expect(`${uniqueID}`).toBe('RVX_3')
    });

});