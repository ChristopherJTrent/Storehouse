
/** @template T not enumerable*/
export default class DataBlock {
	/**
     * 
     * @param {T} startingValue 
     */
	constructor(startingValue = 0) {
		this.value = startingValue
		this.subscribers = []
	}
	/**
     * 
     * @param {Function} callback function to be called whenever the value of the datablock changes
     * @returns null
     */
	subscribe(callback) {
		this.subscribers.push(callback)
		callback(this.value)
	}
	setValue(val) {
		this.value = val
		this.alertSubscribers()
		return true
	}
	updateValue(func) {
		this.value = func(this.value)
		this.alertSubscribers()
		return true
	}
	alertSubscribers() {
		for (const sub of this.subscribers) {
			sub(this.value)
		}
	}
}