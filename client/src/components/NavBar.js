import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import M from 'materialize-css'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import i18next from 'i18next';

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'GB'
  },
  {
    code: 'es',
    name: 'Español',
    country_code: 'ES'
  },
  {
    code: 'it',
    name: 'Italiano',
    country_code: 'IT'
  },
  {
    code: 'fr',
    name: 'Français',
    country_code: 'FR'
  },
  {
    code: 'pl',
    name: 'Polski',
    country_code: 'PL'
  },
  {
    code: 'ru',
    name: 'Pосійський',
    country_code: 'RU'
  },
  {
    code: 'ua',
    name: 'Yкраїнський',
    country_code: 'UA'
  },
  {
    code: 'ps',
    name: 'پښتو',
    country_code: 'PS'
  },
]

const NavBar = () => {
  useEffect(()=>{
    let dropdowns = document.querySelectorAll(".dropdown-trigger");
    let options = {
      inDuration: 300,
      outDuration: 225,
      hover: true,
      belowOrigin: true,
      constrainWidth: false,
      coverTrigger: false
    };
    M.Dropdown.init(dropdowns, options);
    }, [])
    
  const { t } = useTranslation();
  const navigate = useNavigate()
  const mother = localStorage.getItem("mother")
  const donor = localStorage.getItem("donor")
  const renderList = () =>{
    const languageDropdownButton = 
  <li key="lang">
      <a 
      className='dropdown-trigger small material-icons language-icon' 
      href='#' 
      data-target='dropdown1'
      onMouseEnter={e => {
        const inst = M.Dropdown.getInstance(e.target);
        inst && inst.open();
        }}
      >language</a>
        <ul id='dropdown1' className='dropdown-content'>


        <li onClick={() => i18next.changeLanguage(languages[0].code)}>
          <span>{getUnicodeFlagIcon("GB")} {languages[0].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[1].code)}>
          <span>{getUnicodeFlagIcon("ES")} {languages[1].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[2].code)}>
          <span>{getUnicodeFlagIcon("IT")} {languages[2].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[3].code)}>
          <span>{getUnicodeFlagIcon("FR")} {languages[3].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[4].code)}>
          <span>{getUnicodeFlagIcon("PL")} {languages[4].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[5].code)}>
          <span>{getUnicodeFlagIcon("RU")} {languages[5].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[6].code)}>
          <span>{getUnicodeFlagIcon("UA")} {languages[6].name}</span>
        </li>
        <li onClick={() => i18next.changeLanguage(languages[7].code)}>
          <span>{getUnicodeFlagIcon("PS")} {languages[7].name}</span>
        </li>

        </ul>
  </li>
  const logoutNavbar =
      <li key="logout">
        <button className="btn-small waves-effect logout-button"
            onClick={()=> {
              localStorage.clear()
              navigate('/')
            }}>
          {t("logout_navbar")}
        </button>
      </li>
      
    if(mother){
      return[
        <li key="userName">{t("signed_in_as_navbar")}{JSON.parse(localStorage.getItem('mother')).name}</li>,
        <li key="aboutus"><Link to="/aboutus">{t("about_us_navbar")}</Link></li>,
        <li key="request"><Link to="/requests/mother">{t("requests_navbar")}</Link></li>,
        <li key="motherprofile"><Link to="/profile/mother">{t("profile_navbar")}</Link></li>,
        languageDropdownButton,
        logoutNavbar
      ]
    } 
    else if(donor){
      return[
        <li key="userName">{t("signed_in_as_navbar")}{JSON.parse(localStorage.getItem('donor')).name}</li>,
        <li key="aboutus"><Link to="/aboutus">{t("about_us_navbar")}</Link></li>,
        <li key="request"><Link to="/requests/donor">{t("requests_navbar")}</Link></li>,
        languageDropdownButton,
        logoutNavbar
      ]
    } 
    else {
      return [
        <li key="aboutus"><Link to="/aboutus">{t("about_us_navbar")}</Link></li>,
        <li key="login"><Link to="/login">{t("login")}</Link></li>,
        languageDropdownButton
      ]
    }
  }
  
  return (
  <div>
    <nav className="z-depth-0">
      <div className="nav-wrapper">
        <div className="col s12">
          <Link to="/" className="brand-logo center">Sonder</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
  }

  export default NavBar