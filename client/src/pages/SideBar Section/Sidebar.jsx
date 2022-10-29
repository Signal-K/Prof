import React from 'react';
import './sidebar.css';

// Assets & Images ==========>
import logo from '../../Assets/logo.png';

// Icons =========>
import { IoMdSpeedometer } from 'react-icons/io';
import { MdDeliveryDining, MdOutlineExplore, MdOutlinePermContactCalendar } from 'react-icons/md';
import { BsTrophy, BsCreditCard2Front, BsQuestionCircle } from 'react-icons/bs';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BiTrendingUp } from 'react-icons/bi';

const Sidebar = () => {
  return (
    <div className='sideBar grid'>
      <div className='logoDiv flex'>
        <img src={logo} alt="Logo" />
        <h2>Star Sailors.</h2>
      </div>
      <div className='menuDiv'>
        <h3 className='divTitle'>QUICK MENU</h3>
        <ul className='menuLists grid'>
          <li className='listItem'>
            <a href="#" className='menuLink flex'>
              <IoMdSpeedometer className='icon' />
              <span className='smallText'>
                Dashboard
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <MdDeliveryDining className='icon' />
              <span className='smalText'>
                Link 2
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <MdOutlineExplore className='icon' />
              <span className='smalText'>
                Link 3
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <BsTrophy className='icon' />
              <span className='smalText'>
                Link 4
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className='settingsDiv'>
        <h3 className='divTitle'>SETTINGS</h3>
        <ul className='menuLists grid'>
          <li className='listItem'>
            <a href="#" className='menuLink flex'>
              <AiOutlinePieChart className='icon' />
              <span className='smallText'>
                Charts
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <BiTrendingUp className='icon' />
              <span className='smalText'>
                Trends
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <MdOutlinePermContactCalendar className='icon' />
              <span className='smalText'>
                Contact
              </span>
            </a>
          </li>
          <li className='listItem'>
            <a href='#' className='menuLink flex'>
              <BsCreditCard2Front className='icon' />
              <span className='smalText'>
                Products
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className='sideBarCard'> {/* Put profile section in sidebar like in Thrive WP, Reddit */}
        <BsQuestionCircle className='icon' />
        <div className='cardContent'>
          <div className='circle1'></div>
          <div className='circle2'></div>

          <h3>Help Center</h3>
          <p>Contact liam@skinetics.tech for help</p>
          <button className='btn'>Go to help center</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;