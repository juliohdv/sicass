import React from 'react';
import Grid from '@material-ui/core/Grid';




export default function Dashboard(props) {
  //const classes = useStyles();
  return (
    <Grid spacing={3}>
      {props.contenedor}
    </Grid>
  );
}