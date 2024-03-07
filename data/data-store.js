import { sum } from "./aggregators.js";
import ArrayDataBlock from "./array-data-block.js";
import DataBlock from "./data-block.js"
import EnumDataBlock from "./enum-data-block.js";


/**
 * @static
 */
export default class DataStore {
    constructor() {throw new ReferenceError('reference to undeclared variable "DataStore"')}
    
    /** @type {Map<String, DataBlock>} */
    static storage = new Map()

    static registerProvider(key, startingValue = 0) {
        DataStore.storage.set(key, new DataBlock(startingValue))
        return [
            (value) => {
                DataStore.storage.get(key).setValue(value);
            },
            () => DataStore.storage.get(key)
        ]
    }

    static registerArrayProvider(key, startingValue = []) {
        DataStore.storage.set(key, new ArrayDataBlock(startingValue));
        return [
            (index, value) => {
                DataStore.storage.get(key).setValueAtIndex(index, value)
            },
            () => DataStore.storage.get(key).value
        ]
    }
    static registerEnumProvider(key, allowedValues, startingValue = allowedValues[0]) {
        DataStore.storage.set(key, new EnumDataBlock(allowedValues, startingValue))
        return [
            (value) => DataStore.storage.get(key).setValue(value),
            () => DataStore.storage.get(key).value
        ]
    }
    static registerSubscriber(key, callback) {
        return DataStore.storage.get(key).subscribe(callback);
    }
    static registerAggregateSubscriber(key, callback, aggregator = sum) {
        const block = DataStore.storage.get(key)
        return block.subscribeAggregate(callback, aggregator);
    }
    static hasProvider(key) {
        return DataStore.storage.has(key);
    }
}