/**
 * 
 * @param {Number[]} arr 
 * @returns {Number}
 */
export function sum(arr) {
	return arr.reduce((prev, curr) => prev + curr, 0)
}