import React, { useState } from 'react'
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
  const [selected, setSelected] = useState('')
  const classes = useStyles()
  const cardSelected = type => {
    setSelected(type)
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={4}>
          <StatisticsCard type='atm' selected={selected} onSelected={cardSelected} />
        </Grid>
        <Grid item xs={4}>
          <StatisticsCard type='pos' selected={selected} onSelected={cardSelected} />
        </Grid>
        <Grid item xs={4}>
          <StatisticsCard type='ecomm' selected={selected} onSelected={cardSelected} />
        </Grid>
      </Grid>
    </Paper>
  )
}
