import React from 'react'
import { Descript } from './Descript'

const Description = ({full}) => {

  return (
    <div>
        {full ? full.map(ful => (
        <Descript key={ful.id} {...ful} />
        )) : <h4>Loading...</h4>
        }
    </div>
  )
}

export  {Description}