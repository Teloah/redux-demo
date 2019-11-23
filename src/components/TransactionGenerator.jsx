import React from 'react'
import { Grid, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { generator } from '../utils/generator'

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
    const transaction = generator()
    dispatch({
      type: 'transaction / ADD',
      payload: { transaction }
    })
  }

  return (
    <Paper className={classes.paper}>
      <Grid container justify='center'>
        <Grid item xs={2}>
          <Button variant='contained' onClick={generateTransaction}>
            Generate
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
