import { sum } from "./aggregators.js";
import ArrayDataBlock from "./array-data-block.js";
import DataBlock from "./data-block.js"
import EnumDataBlock from "./enum-data-block.js";


/**
 * @static
 */
export default class Storehouse {
    constructor() {throw new ReferenceError('reference to undeclared variable "DataStore"')}
    
    /** @type {Map<String, DataBlock>} */
    static storage = new Map()

    /**
     * @template T
     * Registers a provider that will track the changes to a single value
     * @param {String} key the name of the provider
     * @param {T} [startingValue=0] the starting value of the provider
     * @returns {[(value: T)=>undefined, ()=>T]} a pair of functions [set, get]
     */
    static registerProvider(key, startingValue = 0) {
        Storehouse.storage.set(key, new DataBlock(startingValue))
        return [
            (value) => {
                Storehouse.storage.get(key).setValue(value);
            },
            () => Storehouse.storage.get(key)
        ]
    }
    /**
     * @template T
     * Registers a provider that will track the changes to an array of values
     * @param {String} key the name of the provider
     * @param {T[]} [startingValue=[]] the starting value of the provider
     * @returns {[(index:Number, value:T)=>undefined, ()=>T[]]} a pair of functions [set, get]
     */
    static registerArrayProvider(key, startingValue = []) {
        Storehouse.storage.set(key, new ArrayDataBlock(startingValue));
        return [
            (index, value) => {
                Storehouse.storage.get(key).setValueAtIndex(index, value)
            },
            () => Storehouse.storage.get(key).value
        ]
    }
    /**
     * @template T
     * 
     * @param {String} key the name of the provider
     * @param {T} allowedValues the permitted range of starting values
     * @param {T} [startingValue=allowedValues[0]] the starting value for the provider, which must be a member of allowedValues
     * @returns {[(value: T)=>undefined, ()=>T]} a pair of functions [set, get]
     */
    static registerEnumProvider(key, allowedValues, startingValue = allowedValues[0]) {
        Storehouse.storage.set(key, new EnumDataBlock(allowedValues, startingValue))
        return [
            (value) => Storehouse.storage.get(key).setValue(value),
            () => Storehouse.storage.get(key).value
        ]
    }
    /**
     * registers a subscriber to a given provider
     * @template T
     * @param {String} key the name of the provider
     * @param {(value: T) => undefined} callback 
     */
    static registerSubscriber(key, callback) {
        Storehouse.storage.get(key).subscribe(callback);
    }
    /**
     * registers a subscriber to a given aggregate provider
     * @template T
     * @param {String} key the name of the provider
     * @param {(value: T) => undefined} callback a function that will handle the value 
     * @param {(list: T[]) => T} aggregator a function that aggregates an array of values into a single value
     */
    static registerAggregateSubscriber(key, callback, aggregator = sum) {
        Storehouse.storage.get(key).subscribeAggregate(callback, aggregator);
    } 
    /**
     * forces an update to a provider's subscribers
     * @param {String} key the name of the provider
     */
    static forceUpdate(key) {
        Storehouse.storage.get(key)?.alertSubscribers();
    }
    /**
     * checks if a given provider name is registered
     * @param {String} key the name of the provider to verify
     * @returns {boolean} true if present
     */
    static hasProvider(key) {
        return Storehouse.storage.has(key);
    }
}