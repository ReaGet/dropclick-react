import React from 'react'

const Descript = (props) => {

    const {description} = props;
    function createMarkup() {
        return {__html: description};
      }

  return (
    <div dangerouslySetInnerHTML={createMarkup()} />
  )
}

export  {Descript}