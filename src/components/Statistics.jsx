import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import StatisticsCard from './StatisticsCard'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing()
  }
}))

export default function Statistics() {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={4}>
          <StatisticsCard type='ATM' />
        </Grid>
        <Grid item xs={4}>
          <StatisticsCard type='POS' />
        </Grid>
        <Grid item xs={4}>
          <StatisticsCard type='EComm' />
        </Grid>
      </Grid>
    </Paper>
  )
}
