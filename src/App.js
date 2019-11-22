import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Provider } from 'react-redux'

import { initStore } from './redux/store'

const store = initStore()

function App() {
  return (
    <Provider store={store}>
      <Grid container justify='center'>
        <Grid item>
          <Typography variant='h1'>Demo Application</Typography>
        </Grid>
      </Grid>
    </Provider>
  )
}

export default App
