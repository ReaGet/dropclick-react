import React from 'react'

const Razdels = (props) => {
    const {
      name, 
      id,
      handleChange,
      isChecked
    } = props;
  return (
    <>
        <input type="radio" className="btn-check" name="btnradio" id={id} autoComplete="off" value={name} onChange={handleChange} checked={isChecked(name)}/>
        <label className="btn btn-outline-secondary" htmlFor={id}>{name}</label>
    </>
  )
}

export  {Razdels}