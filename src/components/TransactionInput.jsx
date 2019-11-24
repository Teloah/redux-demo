import React, { useState } from 'react'
import {
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing()
  }
}))

const defaultTransaction = {
  type: 'POS',
  card: '9876543210123456',
  amount: '10.25'
}

export default function TransactionInput() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [transaction, setState] = useState(defaultTransaction)

  const submit = e => {
    e.preventDefault()
    dispatch({
      type: 'transaction / ADD',
      payload: {
        transaction
      }
    })
    setState(defaultTransaction)
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={submit}>
        <Grid container justify='center' alignItems='center' spacing={4}>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                fullWidth
                value={transaction.type}
                onChange={e => setState({ ...transaction, type: e.target.value })}
              >
                <MenuItem value={'ATM'}>ATM</MenuItem>
                <MenuItem value={'POS'}>POS</MenuItem>
                <MenuItem value={'EComm'}>EComm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              name='card'
              label='Card'
              value={transaction.card}
              onChange={e => setState({ ...transaction, card: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              name='amount'
              label='Amount'
              type='number'
              autoComplete={'off'}
              value={transaction.amount}
              onChange={e => setState({ ...transaction, amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button type='submit' variant='contained'>
              Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
