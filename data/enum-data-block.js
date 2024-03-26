import DataBlock from './data-block.js'

/** @template T */
export default class EnumDataBlock extends DataBlock {
	/**
     * @param {T[]} allowedValues the list of permitted values
     * @param {T} startingValue the starting value, which must be a member of allowedValues
     * @throws if the starting value is not a member of allowedValues
     */
	constructor(allowedValues, startingValue) {
		super()
		this.allowedValues = allowedValues
		if (!this.allowedValues.includes(startingValue)) throw new Error('Starting value must be an allowed value.')
		this.value = startingValue 
		this.subscribers = []
	}

	/**
     * 
     * @param {T} value 
     * @returns {boolean} true if successful, false otherwise.
     */
	setValue(value) {
		if (this.allowedValues.includes(value)) {
			this.value = value
			this.alertSubscribers()
			return true
		}
		return false
	}
}