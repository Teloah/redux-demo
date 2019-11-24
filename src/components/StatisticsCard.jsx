import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography, ButtonBase } from '@material-ui/core'
import { getTransactionsByType, getTransactionAmountByType, getSelected } from '../redux/store'
import { typeSelected } from '../redux/ui'

export default function StatisticsCard({ type }) {
  console.log('repainting', type)
  const list = useSelector(getTransactionsByType(type))
  const amount = useSelector(getTransactionAmountByType(type))
  const selected = useSelector(getSelected)
  const dispatch = useDispatch()

  const cardSelected = type => {
    dispatch(typeSelected(type))
  }

  const isSelected = selected === type

  return (
    <Grid container>
      <Grid item xs={12}>
        <ButtonBase onClick={() => cardSelected(type)}>
          <Typography
            color={isSelected ? 'primary' : 'textPrimary'}
            variant={isSelected ? 'h3' : 'h4'}
          >
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
