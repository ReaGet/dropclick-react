import React from 'react'
import { Razdels } from './Razdels'

import { GiSettingsKnobs } from "react-icons/gi"
import { CiSearch } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";

import { useTranslation } from 'react-i18next';

const Filtres = ({razdel, handleChange, isChecked, handleChangeSort, isAuth}) => {

  const { t } = useTranslation();

  return (
    <div>
        <div className='filters'>
          <div className='row mobil'>
            <div className='col-2'>
              <button type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                <GiSettingsKnobs style={{marginRight: '10px'}} /> {t("Filters")}
              </button>
              <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item">
                  <input type="radio" className="btn-check" name="drop" id="New" autoComplete="off" value='New ones first' onChange={handleChangeSort} />
                  <label htmlFor="New">{t("New ones first")}</label>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <input type="radio" className="btn-check" name="drop" id="Old" autoComplete="off" value='The old ones first' onChange={handleChangeSort} />
                  <label htmlFor="Old">{t("The old ones first")}</label>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <input type="radio" className="btn-check" name="drop" id="Cheaper" autoComplete="off" value='Cheaper at first' onChange={handleChangeSort} />
                  <label htmlFor="Cheaper">{t("Cheaper at first")}</label>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <input type="radio" className="btn-check" name="drop" id="More" autoComplete="off" value='More expensive at first' onChange={handleChangeSort} />
                  <label htmlFor="More">{t("More expensive at first")}</label>
                </a>
              </li>
                {isAuth ? 
                <li>
                  <a className="dropdown-item">
                    <input type="radio" className="btn-check" name="drop" id="Favor" autoComplete="off" value='Favorites' onChange={handleChangeSort} />
                    <label htmlFor="Favor">{t("Favorites")}</label>
                  </a>
                </li> : <></>
                }
              </ul>
            </div>
            <div className='col-6 midle'>
              <div className="input-group">
                <span className="input-group-text"><CiSearch style={{marginRight: '7px'}} /> {t("Search")}</span>
                <input type="text" aria-label="First name" className="form-control"/>
              </div>
            </div>
            <div className='col-4 end'>
              <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
              <label className="btn btn-outline-secondary" htmlFor="btncheck1"><FaRegCheckCircle style={{marginRight: '10px'}} /> {t("Completed")}</label>
            </div>

          </div>
          </div>
              <div className="razd">
                  <input type="radio" className="btn-check" name="btnradio" id="all" autoComplete="off" value="all" onChange={handleChange} checked={isChecked('all')} />
                  <label className="btn btn-outline-secondary" htmlFor="all">{t("All")}</label>
                  {razdel ? razdel.map(razd => (
                  <Razdels key={razd.id} handleChange={handleChange} isChecked={isChecked} {...razd} />
                  )) : <h4>Loading...</h4>
                  }
              </div>
    </div>
  )
}

export  {Filtres}