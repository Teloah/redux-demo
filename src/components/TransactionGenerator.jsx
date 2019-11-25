import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Section from './Section'
import { generator } from '../utils/generator'
import { addTransaction, generateTransactions } from '../redux/transactions'

export default function TransactionGenerator() {
  const dispatch = useDispatch()

  const generateTransaction = () => {
    dispatch(addTransaction(generator()))
  }

  return (
    <Section>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={2}>
          <Button variant='contained' onClick={generateTransaction}>
            Generate
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' onClick={() => dispatch(generateTransactions(20))}>
            Generate 20
          </Button>
        </Grid>
      </Grid>
    </Section>
  )
}
