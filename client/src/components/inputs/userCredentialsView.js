import React from 'react';
import TextField from "@mui/material/TextField";
import "../../styles/css/App.css"

function UserInput(props) {
  return (
    <TextField 
      className= "inputRounded"
      value={props.inputValue}
      onChange={props.handleChange}
      inputProps={{ style :{fontSize: 25} }}
      fullWidth={true}
      id="outlined-basic-4rww"
      variant="outlined" 
      margin="normal"
      required={true}
      type={String(props.inputType)}
    />
  )
}
export default UserInput;
