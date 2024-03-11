import React from 'react'
import { Card } from './Card'

const Cards = ({cards, handleStar, isAuth, email, star, wallet}) => {
  return (
    <div className="gradient-cards">
        {cards ? cards.map(card => (
        <Card key={card.id} email={email} handleStar={handleStar} isAuth={isAuth} star={star} {...card} />
        )) : <h4>Loading...</h4>
        }
    </div>
  )
}

export  {Cards}