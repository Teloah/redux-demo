import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { getBestRating } from '../redux/store'
import Section from './Section'

export default function BestRating() {
  const rating = useSelector(getBestRating)

  return (
    <Section>
      <Grid container>
        <Grid item xs={12}>
          <Typography>Best rating:</Typography>
        </Grid>
        <Grid item xs={12} container justify='space-between'>
          <Grid item xs={5}>
            <Typography variant='h4'>{rating.name}</Typography>
          </Grid>
          <Grid item xs={7} container justify='flex-end'>
            <Grid item>
              <Typography variant='h4'>{rating.rating}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  )
}
