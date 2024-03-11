import React from 'react'
import { Info } from './Info'

const Infos = ({full}) => {
  return (
    <div>
        {full ? full.map(ful => (
        <Info key={ful.id} {...ful} />
        )) : <h4>Loading...</h4>
        }
    </div>
  )
}

export  {Infos}