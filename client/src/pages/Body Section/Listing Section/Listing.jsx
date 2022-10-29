import React from 'react';
import './listing.css';

// Icon & Asset imports ===>
import { BsArrowRightShort } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import tesspic from '../../../Assets/StatElements/TessStat.png';

const Listing = () => {
  return (
    <div className='listingSection'>
      <div className='heading flex'>
        <h1>My Listings</h1>
        <button className='btn flex'>
          See All <BsArrowRightShort className='icon' />
        </button>
      </div>
      <div className='secContainer flex'>
        <div className='singleItem'>
          <AiFillHeart className='icon' />
          <img src={tesspic} alt="Tess telescope" /> {/* Replace with pic of drone/rover/mineral */}
          <h3>Annual Spread</h3>
        </div>
        <div className='singleItem'>
          <AiOutlineHeart className='icon' />
          <img src={tesspic} alt="Tess telescope" /> {/* Replace with pic of drone/rover/mineral */}
          <h3>Annual Spread</h3>
        </div>
        <div className='singleItem'>
          <AiOutlineHeart className='icon' />
          <img src={tesspic} alt="Tess telescope" /> {/* Replace with pic of drone/rover/mineral */}
          <h3>Annual Spread</h3>
        </div>
        <div className='singleItem'>
          <AiOutlineHeart className='icon' />
          <img src={tesspic} alt="Tess telescope" /> {/* Replace with pic of drone/rover/mineral */}
          <h3>Annual Spread</h3>
        </div>
      </div>
      <div className='sellers flex'>
        <div className='topSellers'>
          <div className='heading flex'>
            <h3>Top Sellers</h3>
            <button className='btn flex'>
              See All <BsArrowRightShort className='icon' />
            </button>
          </div>
          <div className='card flex'>
            <div className='users'>
              <img src={tesspic} alt="User Image" /> {/* Profile pic of the user being referenced | For now just create a for loop to sort through each user from Supabase */}
              <img src={tesspic} alt="User Image" />
              <img src={tesspic} alt="User Image" />
              <img src={tesspic} alt="User Image" />
            </div>
            <div className='cardText'>
              <span>
                14.556 $SK sold <br />
                <small>
                  21 Sellers <span className='date'>7 days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className='featuredSellers'>
          <div className='heading flex'>
            <h3>Featured Sellers</h3>
            <button className='btn flex'>See All <BsArrowRightShort className='icon' /></button>
          </div>
          <div className='card flex'>
            <div className='users'>
              <img src={tesspic} alt="User Image" />
              <img src={tesspic} alt="User Image" />
              <img src={tesspic} alt="User Image" />
              <img src={tesspic} alt="User Image" />
            </div>
            <div className='cardText'>
              <span>
                1,245 $SK sold <br />
                <small>
                  26 Sellers <span className='date'>7 days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing;