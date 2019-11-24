import React from 'react'
import { Grid, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { generator } from '../utils/generator'
import { addTransaction } from '../redux/transactions'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing()
  }
}))

export default function TransactionGenerator() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const generateTransaction = () => {
    dispatch(addTransaction(generator()))
  }

  const generate100 = () => {
    for (let i = 0; i < 100; i++) {
      generateTransaction()
    }
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={2}>
          <Button variant='contained' onClick={generateTransaction}>
            Generate
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' onClick={generate100}>
            Generate 100
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
