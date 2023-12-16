//-------------------------------------------------------//
//  File Name: Earth.jsx
//  Description: Three-Globe scene of Earth
//
//  Requirements:
//      - CanvasElement.jsx
//
//  Renders:
//      - Earth.jsx
//
// Created By: Corey Yang-Smith
// Date: November 11th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// Three Globe
import ThreeGlobe from 'three-globe';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Utilities
import {
	GLOBE_X_TILT,
	CLOUDS_ALT,
	CLOUDS_IMG_URL,
	CLOUDS_X_ROTATION_SPEED,
	CLOUDS_Y_ROTATION_SPEED,
	GLOBE_Y_ROTATION_SPEED,
	GLOBE_X_POSITION,
} from './config.js';

import { EARTH_MAP } from '../../../utils/SceneUtilities.js';
import { Context } from '../Landing.jsx';
import { useContext } from 'react';

// Utilities
import {
	GetArcsData,
	GetRandomElements,
	GetLabelData,
	GetRippleData,
} from '../../../utils/GlobeUtilities.js';

//  MAIN FUNCTION
//-------------------------------------------------------//

const Earth = (props) => {
	const { scene } = useThree();
	const [fromObj, setFromObj, toObj, setToObj] = useContext(Context);

	if (scene.getObjectByName('Earth'))
		scene.remove(scene.getObjectByName('Earth'));

	const group = new THREE.Group();

	const Globe = new ThreeGlobe({
		waitForGlobeReady: false,
		animateIn: false,
	}).globeImageUrl(EARTH_MAP);

	if (toObj.id != undefined && fromObj.id != undefined) {
		const arcsData = GetArcsData(fromObj, toObj);
		const labelData = GetLabelData(fromObj, toObj);
		//const ringData = GetRippleData(fromObj, toObj);

		Globe
			.globeImageUrl(EARTH_MAP)
			.arcsData(arcsData)
			.arcColor('color')
			.arcDashLength(1)
			.arcDashGap(3)
			.arcDashInitialGap(() => 1)
			.arcDashAnimateTime(1500)

			.labelsData(labelData)
			.labelText(
				(d) =>
					`${d.airportCode} (${Math.round(d.lat * 1e2) / 1e2}, ${
						Math.round(d.lng * 1e2) / 1e2
					}) \n ${d.name}`
			)
			.labelSize('size')
			.labelDotRadius('dot')
			.labelDotOrientation(() => 'right')
			.labelColor('color')
			.labelResolution(10);
	}

	const Clouds = new THREE.Mesh(
		new THREE.SphereGeometry(
			Globe.getGlobeRadius() * (1 + CLOUDS_ALT),
			100,
			100
		)
	);
	new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
		Clouds.material = new THREE.MeshPhongMaterial({
			map: cloudsTexture,
			transparent: true,
		});
	});

	const Lights = new THREE.AmbientLight();
	Lights.intensity = 3;

	group.add(Globe);
	group.add(Clouds);
	group.add(Lights);
	group.name = 'Earth';

	group.rotation.x = GLOBE_X_TILT * (Math.PI / 180);
	group.position.x = GLOBE_X_POSITION;

	scene.add(group);

	if (props.toggle) {
		(function rotateClouds() {
			Clouds.rotation.x += (CLOUDS_X_ROTATION_SPEED * Math.PI) / 180;
			Clouds.rotation.y += (CLOUDS_Y_ROTATION_SPEED * Math.PI) / 180;
			requestAnimationFrame(rotateClouds);
		})();

		(function animate() {
			group.rotation.y += GLOBE_Y_ROTATION_SPEED * (Math.PI / 180);
			requestAnimationFrame(animate);
		})();
	}
};

//  EXPORTS
//-------------------------------------------------------//

export default Earth;
