// Module & file imports ======>
import React from 'react';
import './top.css';

// Icon & Asset imports ======>
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { BsArrowRightShort } from 'react-icons/bs';

// Image imports ======>
import propic from '../../../Assets/logo.png'; // Will later retrieve user profile pic from port 5000 (This import is for the user's profile pic in the top/nav section)
import video1 from '../../../Assets/video1.mov'; // update directory later /#/ Generate this from user view (i.e. what would be seen if user was in Unity) later
import tesspic from '../../../Assets/StatElements/TessStat.png';

const Top = () => {
  const userName = "Username"; // This will later be retrieved from the API (port 5000), which retrieves data from the database configured in the .env
  var firstName = "Liam"; // db.userId.firstName (userId == userName (foreign/pk))

  return (
    <div className='topSection'>
      <div className='headerSection flex'>
        <div className='title'>
          <h1>Welcome to Star Sailors</h1>
          <p>Hello {firstName}, Welcome back! </p>
        </div>
        <div className='searchBar flex'>
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className='icon' />
        </div>
        <div className='adminDiv flex'>
          <TbMessageCircle className='icon' />
          <MdOutlineNotificationsNone className='icon' />
          <div className='adminImage'>
            <img src={propic} alt="Your profile picture" />
          </div>
        </div>
      </div>
      <div className='cardSection flex'>
        <div className='rightCard flex'>
          <h1>Keep track of your assets in Star Sailors</h1>
          <p>Demo demo demo demo demo demo demo demo</p>
          <div className='buttons flex'>
            <button className='btn'>Explore More</button>
            <button className='btn transparent'>Explore More</button>
          </div>
          <div className='videoDiv'>
            <video src={video1} autoPlay loop muted></video>
          </div>
        </div>
        <div className='leftCard flex'>
          <div className='main flex'>
            <div className='textDiv'>
              <h1>My Stats</h1>
              <div className='flex'>
                <span>
                  Today <br /> <small>4 Orders</small>
                </span>
              </div>
              <div className='flex'>
                <span>
                  This Month <br /> <small>127 Orders</small>
                </span>
              </div>
              <span className='flex link'>
                Go to my orders <BsArrowRightShort className='icon' />
              </span>
            </div>
            <div className='imgDiv'>
              <img src={tesspic} alt="Image Name" />
            </div>
            {/*<div className='sideBarCard'>
              <BsQuestionCircle className='icon' />
              <div className='cardContent'>
                <div className='circle1'></div>
                <div className='circle2'></div>
                <h3>Help Center</h3>
                <p>Demo demo demo demo demo demo</p>
                <button className='btn'>Go to help center</button>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Top;