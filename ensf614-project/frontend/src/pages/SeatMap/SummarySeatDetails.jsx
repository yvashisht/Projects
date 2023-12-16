//-------------------------------------------------------//
//  File Name: SummarySeatDetails.jsx
//  Description: Seat Details Box for Seat Selection Information
//
//  Requirements:
//      - SeatSelectionForm.jsx
//
//  Renders:
//      - Seat Details
//
// Created By: Corey Yang-Smith
// Date: November 24th, 2023
//-------------------------------------------------------//

//  IMPORTS
//-------------------------------------------------------//

// React Import
import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import TitleLineItem from './TitleLineItem';
import DetailLineItem from './DetailLineItem';
import { getSeatName, getSeatType } from '../../utils/SeatUtilities.js';

//  MAIN FUNCTION
//-------------------------------------------------------//
const SummarySeatDetails = (props) => {


  return (
    <Paper elevation={4} sx={{background: "#161616", borderRadius: "15px"}}>
    <Grid
      container
      direction="column"
    >
      <TitleLineItem title="SEAT DETAILS" />


      <Grid
        container
        item
        xs={9}
		sx={{paddingTop: "8px", marginBottom: "12px"}}
      >
        <DetailLineItem description="Seat Type" value={getSeatType(props.seat)}/>
        <DetailLineItem description="Location" value={getSeatName(props.seat)}/>

      </Grid>
    </Grid>
  </Paper>
  )
}

//  EXPORTS
//-------------------------------------------------------//
export default SummarySeatDetails