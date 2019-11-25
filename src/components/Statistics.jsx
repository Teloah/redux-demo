import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import Section from './Section'
import StatisticsCard from './StatisticsCard'
import { getIsLoading } from '../redux/store'

export default function Statistics() {
  const loading = useSelector(getIsLoading)

  return (
    <Section>
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
    </Section>
  )
}
