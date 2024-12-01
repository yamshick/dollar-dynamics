import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function TextInput({value: propValue, setValue: propSetValue, type}) {

    const [value ,setValue]  = React.useState(propValue)

    React.useEffect(() => {
        setValue(propSetValue)
    }, [propValue])

    const onChange = (e) => {
        const val = e.target.value
        setValue(val)
        propSetValue && propSetValue(val)
    }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: 'auto' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" variant="outlined" value={value} onChange={onChange} type={type}/>
    </Box>
  );
}