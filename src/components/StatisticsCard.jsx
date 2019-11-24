import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography, ButtonBase } from '@material-ui/core'
import numeral from 'numeral'

export default function StatisticsCard({ type, selected, onSelected }) {
  console.log('repainting', type)

  const list = useSelector(state => state.transactions[type])

  const amount = useSelector(state => {
    console.log('recalculating', type)
    const amnt = state.transactions[type].reduce((result, transaction) => {
      return result + +transaction.amount
    }, 0)
    return numeral(amnt).format('0.00')
  })

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
