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
import React from 'react';

// React Three Fiber
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// My Components
import Scene from './Scene';

//  MAIN FUNCTION
//-------------------------------------------------------//
const CanvasElement = (props) => {
	return (
		<div style={{width: "500px", height: "500px"}}>
			<Canvas
				camera={{ fov: 60, near: 0.1, far: 5000, position: [0, 0, 300] }}
				style={{ position: 'absolute' }}
			>
				<Scene data={props.data} />
			</Canvas>
		</div>
	);
};

//  EXPORTS
//-------------------------------------------------------//
export default CanvasElement;
