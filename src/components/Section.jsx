import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing()
  }
}))

export default function Section({ children }) {
  const classes = useStyles()

  return <Paper className={classes.paper}>{children}</Paper>
}
