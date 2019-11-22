import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Provider } from 'react-redux'

import TransactionInput from './components/TransactionInput'
import { initStore } from './redux/store'

const store = initStore()

function App() {
  return (
    <Provider store={store}>
      <Grid container justify='center'>
        <Grid item xs={12} container justify='center'>
          <Typography variant='h1'>TransMaster</Typography>
        </Grid>
        <Grid item xs={10}>
          <TransactionInput />
        </Grid>
      </Grid>
    </Provider>
  )
}

export default App
