import ArrayDataBlock from "../data/array-data-block.js";

describe('ArrayDataBlock', () => {
    describe('constructor', () => {
        let block;
        beforeEach(() => {
            block = new ArrayDataBlock();
        })
        it('should set the internal value', () => {
            expect(block.value).toEqual([]);
        })
        it('should set subscribers to an empty array', () => {
            expect(block.subscribers).toEqual([])
        })
        it('should set the default aggregation to "sum"', () => {
            expect(block.defaultAggregation([1,2,3])).toEqual(6)
        })
    })
    describe('setDefaultAggregation', () => {
        let block;
        beforeEach(() => {
            block = new ArrayDataBlock();
        })
        it('should set the default aggregation to the provided function', () => {
            block.setDefaultAggregation((v) => v.reduce((a, e) => a * e))
            expect(block.defaultAggregation([2,3])).toEqual(6);
        })
    })
    describe('setValueAtIndex', () => {
        /** @type {ArrayDataBlock} */
        let block;
        beforeEach(() => {
            block = new ArrayDataBlock(Array(4).fill(0));
        })
        it('should set the value at a specified index', () => {
            block.setValueAtIndex(2, 5)
            expect(block.value[2]).toEqual(5)
        })
        describe('when index is larger than the size of the array', () => {
            it('should extend the length of the array', () => {
                block.setValueAtIndex(4, 1)
                expect(block.value.length).toEqual(5)
            })
            it('should fill the empty space with 0s', () => {
                block.setValueAtIndex(10, 1)
                expect(block.value).toEqual([0,0,0,0,0,0,0,0,0,0,1])
            })
        })
    })
    describe('subscribeAggregate', () => {
        /** @type {ArrayDataBlock} */
        describe('setting a subscriber', () => {
            /** @type {ArrayDataBlock} */
            let block;
            let spy;
            beforeEach(() => {
                block = new ArrayDataBlock();
                spy = {
                    callback: (value) => {}
                }
            })
            xit('should add a function that calls the callback with the value of the aggregation', () => {
                
            })
        })
    })
})