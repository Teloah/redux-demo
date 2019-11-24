import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography, ButtonBase } from '@material-ui/core'

import { getTransactionsByType, getTransactionAmountByType } from '../redux/transactions'

export default function StatisticsCard({ type, selected, onSelected }) {
  console.log('repainting', type)

  const list = useSelector(getTransactionsByType(type))
  const amount = useSelector(getTransactionAmountByType(type))

  return (
    <Grid container>
      <Grid item xs={12}>
        <ButtonBase onClick={() => onSelected(type)}>
          <Typography color={selected === type ? 'primary' : 'textPrimary'} variant='h4'>
            {type}
          </Typography>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <Typography>Count:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{list.length}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={8}>
          <Typography>Amount:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{amount}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
