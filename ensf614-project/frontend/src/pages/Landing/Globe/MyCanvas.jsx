import { useEffect, useState, useRef } from 'react';
import {
	Canvas,
	useFrame,
	render,
	events,
	unmountComponentAtNode,
} from '@react-three/fiber';

import * as THREE from 'three';

export default function MyCanvas() {
	return <Parent />;
}

function Parent() {
	return (
		<div className="Parent">
			<Child />
		</div>
	);
}

function Child() {
	const wrapper = useRef();
	const [size, setSize] = useState(() => ({ width: 0, height: 0 }));

	useEffect(() => {
		function onResize() {
			// get wrapper dimension without CSS transforms
			if (wrapper.current) {
				setSize({
					width: wrapper.current.clientWidth,
					height: wrapper.current.clientHeight,
				});
			}
		}

		window.addEventListener('resize', onResize);

		onResize();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<div
			ref={wrapper}
			className="Child"
			style={{ transform: `scale(0.5)` }}
		>
			<SceneRF size={size} />
		</div>
	);
}

/**
 * Component using r3f's render function
 */
function SceneRF({ size }) {
	const canvas = useRef();

	// render when size changes
	useEffect(() => {
		render(<Objects />, canvas.current, {
			events,
			size,
		});
	}, [size]);

	// unmount
	useEffect(() => {
		return () => {
			unmountComponentAtNode(canvas.current);
		};
	}, []);

	return <canvas ref={canvas}></canvas>;
}
function Render() {
	// Takes over the render-loop, the user has the responsibility to render
	useFrame(({ gl, scene, camera }) => {
		gl.render(scene, camera);
	}, 1);
}
function Objects() {
	const box = useRef();

	useFrame(() => {
		box.current.rotation.x += 0.01;
		box.current.rotation.y += 0.01;
		box.current.rotation.z -= 0.01;
	});

	return (
		<group>
			<pointLight
				position={[0, 5, 0]}
				color="white"
				intensity={1}
			/>

			<mesh
				ref={box}
				scale={2}
			>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="red" />
			</mesh>

			<mesh position={[0, 0, -10]}>
				<planeGeometry args={[40, 40]} />
				<meshStandardMaterial color="yellow" />
			</mesh>
		</group>
	);
}
