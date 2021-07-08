import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function Dashboard(props) {
  return (
    <Grid spacing={3}>
      {props.contenedor}
    </Grid>
  );
}