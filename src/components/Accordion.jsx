import React from 'react'
import { Instruction } from './Instruction'

const Accordion = ({guid, date}) => {
  return (
    <div className="accordion accordion-flush mt-5 mb-5" id="accordionFlushExample">
        {guid ? guid.map(guid => (
            <Instruction key={guid.id} time={date} {...guid} />
        )) : <h4>Loading...</h4>
        }
    </div>
  )
}

export  {Accordion}