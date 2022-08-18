import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Progress({color='dodgerblue',text='',percentage=1}) {
  return (
    <div style={{ width: 100, height: 100 }}>
<CircularProgressbarWithChildren background={color} value={percentage}>
  <p style={{ fontSize: 12, marginBottom: 0 }}>{text}</p>
  <div style={{ fontSize: 12, marginTop: -5 }}>
    <strong>{percentage}%</strong>
  </div>
</CircularProgressbarWithChildren>
</div>
  )
}

export default Progress;