//-------------------------------------------------------//
//  File Name: config.js
//  Description: Config File for Star Generator
//
// Created By: Corey Yang-Smith
// Date: November 12th, 2023
//-------------------------------------------------------//

// Currently Used
export const NUM_STARS = 5000;
export const CORE_X_DIST = 150;
export const CORE_Y_DIST = 150;
export const GALAXY_THICKNESS = 0;

export const BLOOM_PARAMS = {
	exposure: 1,
	bloomStrength: 1.5,
	bloomThreshold: 0.4,
	bloomRadius: 0,
};

// Not Used
// minimum and maximum star sizes
export const STAR_MIN = 0.25;
export const STAR_MAX = 5.0;

export const HAZE_MAX = 50.0;
export const HAZE_MIN = 20.0;
export const HAZE_OPACITY = 0.2;
export const HAZE_COLOR = 0x0082ff;

export const BASE_LAYER = 0;
export const BLOOM_LAYER = 1;
export const OVERLAY_LAYER = 2;

export const OUTER_CORE_X_DIST = 600;
export const OUTER_CORE_Y_DIST = 600;

export const ARM_X_DIST = 100; //
export const ARM_X_MEAN = 200; // Where arms are centers

export const ARM_Y_DIST = 50;
export const ARM_Y_MEAN = 100;

export const SPIRAL = 1.0; //how strong spiral is
export const ARMS = 3.0; //number of arms

export const HAZE_RATIO = 0.5;