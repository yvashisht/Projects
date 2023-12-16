import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useContext, useLayoutEffect } from 'react';
import { Stars, useGLTF, useScroll } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { useRef } from 'react';
// GSAP Import
import gsap from 'gsap';

// Utilities/Constants
import {
	PLANE_ELEVATION,
	PLANE_SCALE,
	angleBetweenPoints,
} from '../../../utils/SceneUtilities.js';

// My Context
import { Context } from '../Landing.jsx';

export default function Plane(props) {
	const { scene } = useThree();
	const [fromObj, setFromObj, toObj, setToObj] = useContext(Context);
	const ref = useRef();
	//const tl = useRef();

	const scroll = useScroll();

	const angleBetwewen = angleBetweenPoints(
		fromObj.latitude,
		fromObj.longitude,
		toObj.latitude,
		toObj.longitude
	);

	// Import Object
	const { nodes, materials } = useGLTF('./models//scene.gltf');

	// Axes Helper
	// const axes = new THREE.AxesHelper(500);
	// gltf.scene.add(axes);

	useLayoutEffect(() => {

		// Animation
		// Initial State

		// Transition to Parked
		props.tl.current.to(
			ref.current.position,
			{
				x: 0,
				y: 0,
				z: PLANE_ELEVATION + 5,
				duration: 2,
				ease: 'none',
			},
			0
		);
		props.tl.current.to(
			ref.current.scale,
			{
				x: PLANE_SCALE,
				y: PLANE_SCALE,
				z: PLANE_SCALE,
				duration: 2,
				ease: 'none',
			},
			0
		);

		// Rotating While Parked
		props.tl.current.to(
			ref.current.rotation,
			{
				x: (Math.PI / 180) * 90,
				y: ((Math.PI / 180) * (angleBetwewen)),
				z: (Math.PI / 180) * 0,
				duration: 1,
				ease: 'none',
			},
			2
		);

		// Transition to Flying
		props.tl.current.to(
			ref.current.position,
			{
				x: 0,
				y: 0,
				z: PLANE_ELEVATION + 5,
				duration: 1,
				ease: 'none',
			},
			3
		);
		props.tl.current.to(
			ref.current.scale,
			{
				x: PLANE_SCALE * 4,
				y: PLANE_SCALE * 4,
				z: PLANE_SCALE * 4,
				ease: 'none',
				duration: 1,
			},
			3
		);

		// Delay 1 second pause
		// +1

		// Transition to Parked
		props.tl.current.to(
			ref.current.position,
			{
				x: 0,
				y: 0,
				z: PLANE_ELEVATION + 5,
				duration: 1,
				ease: 'none',
			},
			5
		);
		props.tl.current.to(
			ref.current.scale,
			{
				x: PLANE_SCALE,
				y: PLANE_SCALE,
				z: PLANE_SCALE,
				duration: 1,
				ease: 'none',
			},
			5
		);

		// Rotating While Parked (back to default)
		props.tl.current.to(
			ref.current.rotation,
			{
				x: (Math.PI / 180) * 90,
				y: (Math.PI / 180) * 90,
				z: (Math.PI / 180) * 0,
				duration: 1,
				ease: 'none',
			},
			6
		);

		// Parked to Fly Away
		props.tl.current.to(
			ref.current.position,
			{
				x: 20,
				y: 0,
				z: PLANE_ELEVATION + 5,
				duration: 1,
				ease: 'none',
			},
			7
		);
		props.tl.current.to(
			ref.current.scale,
			{
				x: PLANE_SCALE * 2,
				y: PLANE_SCALE * 2,
				z: PLANE_SCALE * 2,
				duration: 1,
				ease: 'none',
			},
			7
		);
	}, []);

	useFrame(() => {
		props.tl.current.seek(scroll.offset * props.tl.current.duration());
	});

	return (
		//initial condition
		<group
			{...props}
			dispose={null}
			ref={ref}
			position={[-20, 0, PLANE_ELEVATION]}
			scale={[PLANE_SCALE * 2, PLANE_SCALE * 2, PLANE_SCALE * 2]}
			rotation={[
				(Math.PI / 180) * 90,
				(Math.PI / 180) * 90,
				(Math.PI / 180) * 0,
			]}
		>
			<mesh
				geometry={nodes.polySurface3_lambert2_0.geometry}
				material={materials.lambert2}
			/>
			<mesh
				geometry={nodes.polySurface3_lambert3_0.geometry}
				material={materials.lambert3}
			/>
			<mesh
				geometry={nodes.polySurface3_lam_balck_engine_0.geometry}
				material={materials.lam_balck_engine}
			/>
			<mesh
				geometry={nodes.polySurface2_T_lam_plane_windows_0.geometry}
				material={materials.T_lam_plane_windows}
			/>
			<mesh
				geometry={nodes.polySurface2_lambert3_0.geometry}
				material={materials.lambert3}
			/>
		</group>
	);
}

useGLTF.preload('./models/scene.gltf');
