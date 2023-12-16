import React from 'react'
import { Button } from '@mui/material'

const MyButton = (props) => {
  return (
    <Button variant="contained">{props.textLabel}</Button>
  )
}



export default MyButton