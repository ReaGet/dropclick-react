import React from 'react'
import { NavLink } from 'react-router-dom'

export const LayoutAdmin = ({ children }) => {
  const getLinkClasses = (isActive) => {
    return [
      "flex items-center gap-6",
      isActive ? 'text-primary' : 'text-white'
    ].join(' ');
  }

  return (
    <div className='flex text-white'>
      <aside className='flex flex-col p-20 bg-[#040406]'>
        <div className="mr-auto md:mr-0 text-4xl text-white font-semibold cursor-default">
          DROP<span className="text-primary">CLICK</span>
        </div>
        <nav className='flex flex-col gap-12 mt-28 text-2xl'>
          <NavLink to="/admin/guides" className={({ isActive }) => {
            return getLinkClasses(isActive)
          }}>
            <svg className='fill-current' width="24" height="24">
              <use xlinkHref='/assets/icons/sprites.svg#guides'></use>
            </svg>
            <span className='-mb-1 text-white'>Гайды</span>
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => {
            return getLinkClasses(isActive)
          }}>
            <svg className='stroke-current' width="24" height="24">
              <use xlinkHref='/assets/icons/sprites.svg#users'></use>
            </svg>
            <span className='-mb-1 text-white'>Пользователи</span>
          </NavLink>
        </nav>
      </aside>
      <main className='px-6 py-8'>
        { children }
      </main>
    </div>
  )
}
