import React from 'react'
import { Grid, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { generator } from '../utils/generator'
import { sleep } from '../utils/sleep'
import { addTransaction } from '../redux/transactions'
import { startLoading, endLoading } from '../redux/ui'

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

  const generate = async count => {
    dispatch(startLoading())
    for (let i = 0; i < count; i++) {
      await sleep(50)
      generateTransaction()
    }
    dispatch(endLoading())
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
          <Button variant='contained' onClick={() => generate(100)}>
            Generate 100
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
