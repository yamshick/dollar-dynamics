import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Widget } from '../widget/widget';

export const WidgetGrid = ({gridWidgets, onDeleteWidgetButtonClick, onUpdateWidget}) => {
    // console.warn({gridWidgets})
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {gridWidgets.map(widget => (
                <Grid size={4} key={widget.id}>
                  <Widget {...widget} onDeleteWidgetButtonClick={onDeleteWidgetButtonClick} onUpdateWidget={onUpdateWidget}/>
                </Grid>              
            ))}
        </Grid>
      </Box>
    )
}