//-------------------------------------------------------//
//  File Name: GalaxyUtilities.jsx
//  Description: Utility Functions for Stars
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

/**
 * Generates Random Distribution given Mean and STDDEV (Bell Curve)
 * @param {*} mean 
 * @param {*} stdev 
 * @returns 
 */
export function gaussianRandom(mean = 0, stdev = 1) {
	let u = 1 - Math.random();
	let v = Math.random();
	let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

	return z * stdev + mean;
}

