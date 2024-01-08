import React from 'react'
import { Alert } from 'react-bootstrap'
const Alerts = (props) => {
  return (
    <div>
      {props.alert && <Alert key={props.alert.type} variant={props.alert.type}>{props.alert.msg}</Alert>}
    </div>
  )
}

export default Alerts
