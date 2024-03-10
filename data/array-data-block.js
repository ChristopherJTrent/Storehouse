import { sum } from "./aggregators.js";
import DataBlock from "./data-block.js";
/** @template T */
export default  class ArrayDataBlock extends DataBlock {

    /**
     * 
     * @param {T[]} value 
     */
    constructor(value = []) {
        super();
        this.value = value;
        this.subscribers = [];
        this.defaultAggregation = sum
    }
    /**
     * sets the default aggregation function that will be used if an aggregate subscriber doesn't specify one.
     * @param {(value: T[]) => T} aggregator
     */
    setDefaultAggregation(aggregator) {
        this.defaultAggregation = aggregator;
        return this;
    }

    setValueAtIndex(index, value) {
        if (index > this.value.length - 1) {
            const difference = index - this.value.length
            this.value = this.value.concat(Array(difference).fill(0))
        }
        this.value[index] = value;
        this.alertSubscribers();
    }

    /**
     * @callback subscriber
     * @param {T} value
     * @returns {null}
     * 
     * @callback aggregator
     * @param {T[]} values
     * @returns {T}
     */
    /**
     * @param {subscriber} callback A callback accepting a single value 
     * @param {aggregator} aggregator a function that accepts an array and returns a single value
     * @returns {undefined}
     */
    subscribeAggregate(callback, aggregator = sum) {
        this.subscribe(() => {callback(aggregator(this.value));})
    }

}