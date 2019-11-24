import React from 'react'
import { Grid, Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import StatisticsCard from './StatisticsCard'
import { getIsLoading } from '../redux/store'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing()
  }
}))

export default function Statistics() {
  const classes = useStyles()
  const loading = useSelector(getIsLoading)

  return (
    <Paper className={classes.paper}>
      <Grid container justify='center' spacing={4}>
        {loading ? (
          <Grid item xs={1}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <StatisticsCard type='ATM' />
            </Grid>
            <Grid item xs={4}>
              <StatisticsCard type='POS' />
            </Grid>
            <Grid item xs={4}>
              <StatisticsCard type='EComm' />
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  )
}
