//-------------------------------------------------------//
//  File Name: Scene.jsx
//  Description: RTF Base Scene
//
//  Requirements:
//      - CanvasElement.jsx
//
//  Renders:
//      - Three.JS Scene
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//
// React Imports
import React, { Suspense, useRef } from 'react';

// My Components
import Earth from './Earth';
import EarthAnimated from './ss/EarthAnimated';
import Stars from '../Galaxy/Stars';
import Plane from '../Plane/Plane';
import { ScrollControls } from '@react-three/drei';
import gsap from 'gsap';
import EarthAnimatedController from './EarthAnimatedController';

//  MAIN FUNCTION
//-------------------------------------------------------//
const Scene = (props) => {
	const tl = useRef();

	// Once Active!
	if (props.toggle) {
		tl.current = gsap.timeline();

		return (
			<>
				<ScrollControls
					pages={3}
					damping={0.25}
				>
					<Plane tl={tl} />
					<EarthAnimatedController tl={tl} />
				</ScrollControls>
			</>
		);
	}

	// Waiting for Input
	return (
		<>
			<Earth
				toggle={props.toggle}
			/>
			<Stars />
		</>
	);
};

//  EXPORTS
//-------------------------------------------------------//

export default Scene;
