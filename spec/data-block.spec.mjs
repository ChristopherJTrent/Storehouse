import {default as DataBlock} from '../data/data-block.js'
describe('DataBlock', () => {
    describe('When Constructed: ', () => {
        let d;
        beforeEach(() => {
            d = new DataBlock(1)
        })
        it('should accept an optional starting value', () => {
            expect(d.value).toEqual(1);
        });
        it('should set up an empty array `subscribers`', () => {
            expect(d.subscribers).toEqual([]);
        }) 
    });
    describe('Subscribing', () => {
        /** @type {DataBlock} */
        let d;
        let func;
        beforeEach(() => {
            d = new DataBlock();
            func = (v) => {return true}
        })
        it('should allow a function to be added to subscribers', () => {
            d.subscribe(func)
            expect(d.subscribers.length).toEqual(1);
        })
    })
    describe('setValue', () => {
        let block;
        let spy;
        let updated = false;
        beforeEach( () => {
            block = new DataBlock(1);
            spy = {
                update: (v) => {
                    updated = v;
                },
            }        
            spyOn(spy, 'update')
            block.subscribe(spy.update)
            block.setValue(2);
        })
        it('should update the value when setValue is called', () => {
            expect(block.value).toEqual(2);
        })
        it('should alert subscribers when the value changes', () => {
            expect(spy.update).toHaveBeenCalled();
        })
    })
    describe('updateValue', () => {
        let block;
        let spy;
        let updated = false;
        beforeEach( () => {
            block = new DataBlock(1);
            spy = {
                update: (v) => {
                    updated = v;
                },
            }        
            spyOn(spy, 'update')
            block.subscribe(spy.update)
            block.updateValue((v) => v * 2);
        })
        it('should update the value by calling the function when called', () => {
            expect(block.value).toEqual(2);
        })
        it('should alert subscribers', () => {
            expect(spy.update).toHaveBeenCalled();
        })
    }) 

});