import React from 'react'
import { Instruct } from './Instruct'

const Accord = ({guid}) => {
  return (
    <div className="accordion accordion-flush mt-5 mb-5" id="accordionFlushExample">
        {guid ? guid.map(guid => (
        <Instruct key={guid.id} {...guid} />
        )) : <h4>Loading...</h4>
        }
</div>
  )
}

export {Accord}