//-------------------------------------------------------//
//  File Name: CanvasElement.jsx
//  Description: RTF Canvas Renderer Base Component
//
//  Requirements:
//      - Landing.jsx
//
//  Renders:
//      - Three.JS Scene
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { Suspense } from 'react';

// React Three Fiber
import { Canvas } from '@react-three/fiber';

// My Components
import Scene from './Scene';

// Utilities
import { CAMERA_DISTANCE } from './config.js';
import { OrbitControls } from '@react-three/drei';

import './styles.css';

//  MAIN FUNCTION
//-------------------------------------------------------//
const CanvasElement = (props) => {
	return (
		<>
			<Canvas
				camera={{
					fov: 60,
					near: 0.1,
					far: 5000,
					position: [0, 0, CAMERA_DISTANCE],
				}}
				style={{ position: 'absolute' }}
				resize={{ scroll: false, debounce: 200 }}
			>
				<OrbitControls
					enableDamping={false}
					enablePan={false}
					enableZoom={false}
					enableRotate={false}
				/>
				<Suspense>
					<Scene
						toggle={props.toggle}
						toObj={props.toObj}
						fromObj={props.fromObj}
					/>
				</Suspense>
			</Canvas>
			<div
				className="spinner scroll-down"
				style={{ zIndex: `${props.toggle ? 1 : -2}` }}
			>
				{' '}
				<a className="animate"></a>{' '}
			</div>
		</>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default CanvasElement;
