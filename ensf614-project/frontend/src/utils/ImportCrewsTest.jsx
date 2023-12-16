//-------------------------------------------------------//
//  File Name: LandingPriceCardDetail.jsx
//  Description: Large Card for further description on available price options
//
//  Requirements:
//      - ModalPriceCardDetail.jsx
//
//  Returns:
//      - Detailed Price Card
//
// Created By: Corey Yang-Smith
// Date: October 6th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// Custom Hooks

import { useCrews } from '../hooks/useCrews.js'

//  MAIN FUNCTION
//-------------------------------------------------------//
function ImportCrewsTest() {
	const { crews } = useCrews();

	const displayCrews = crews.map((value, index) => {
		return (
			<li key={value.id}>
				{value.first_name} {value.last_name} | {value.status}
			</li>
		);
	});

	return (
		<>
			<p>Hello World </p>
			<ul>{displayCrews}</ul>
		</>
	);
}

//  EXPORTS
//-------------------------------------------------------//
export default ImportCrewsTest;
