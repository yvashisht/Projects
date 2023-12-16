	//-------------------------------------------------------//
//  File Name: EarthAnimatedController.jsx
//  Description: Animation Controller for Earth Animated
//
//  Requirements:
//      - CanvasElement.jsx
//
//  Renders:
//      - Earth Animation.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import React, { useRef, useContext, useLayoutEffect } from 'react';

// Three Globe
import { useThree, useFrame } from '@react-three/fiber';


import {
	CAMERA_ZOOM,
	midPoint,
} from '../../../utils/SceneUtilities.js';

//  Gsap
import gsap from 'gsap';
import { Context } from '../Landing.jsx';
import { useScroll } from '@react-three/drei';
import EarthAnimated from './ss/EarthAnimated.jsx';
// TODO - fix render animation not firing on first pass - maybe use state?

//  MAIN FUNCTION
//-------------------------------------------------------//

const EarthAnimatedController = (props) => {

	const { scene } = useThree();
	const ref = useRef(scene.getObjectByName('Earth'));
	const tl = useRef();
	const scroll = useScroll();

	const [fromObj, setFromObj, toObj, setToObj] = useContext(Context);

	const startLat = fromObj.latitude;
	const startLon = fromObj.longitude;

	const endLat = toObj.latitude;
	const endLon = toObj.longitude;

	const midpoint = midPoint(startLat, startLon, endLat, endLon);
	const midLat = midpoint[0];
	const midLon = midpoint[1];

	useLayoutEffect(() => {
		const obj = scene.getObjectByName('Earth');

		props.tl.current.to(
			obj.position,
			{
				x: 0,
				duration: 1,
			},
			0
		);

		props.tl.current.to(
			obj.rotation,
			{
				x: (Math.PI / 180) * startLat,
				y: -((Math.PI / 180) * startLon),
				z: 0,
				duration: 1,
			},
			0
		);

		props.tl.current.to(
			obj.position,
			{
				z: CAMERA_ZOOM,
				duration: 1,
				ease: 'none',
			},
			0
		);

		// Delay 2.5s

		// Start to Midpoint (1.25)
		props.tl.current.to(
			obj.rotation,
			{
				x: (Math.PI / 180) * midLat,
				y: -((Math.PI / 180) * midLon),
				z: 0,
				duration: 1.25,
			},
			3.5
		);

		props.tl.current.to(
			obj.position,
			{
				z: 0,
				duration: 1.25,
				ease: 'none',
			},
			3.5
		);

		// Mipoint to End(1.25)
		// TODO,sometimes spins too far, need logic to better handle breakpoints
		props.tl.current.to(
			obj.rotation,
			{
				x: (Math.PI / 180) * endLat,
				y: -(Math.PI / 180) * endLon,
				z: 0,
				duration: 1.25,
			},
			4.75
		);

		props.tl.current.to(
			obj.position,
			{
				z: CAMERA_ZOOM,
				duration: 1.25,
				ease: 'none',
			},
			4.75
		);

		// Stay in Final Position
		props.tl.current.to(
			obj.rotation,
			{
				x: (Math.PI / 180) * endLat,
				y: -((Math.PI / 180) * endLon),
				z: 0,
				duration: 3,
			},
			6
		);

		props.tl.current.to(
			obj.position,
			{
				z: CAMERA_ZOOM,
				duration: 3,
				ease: 'none',
			},
			6
		);
	}, []);

	useFrame(() => {
		props.tl.current.seek(scroll.offset * props.tl.current.duration());
	});

	return (
		<group ref={ref}>

		</group>
	);
};
//  EXPORTS
//-------------------------------------------------------//

export default EarthAnimatedController;
