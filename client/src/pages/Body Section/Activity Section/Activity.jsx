import React from "react";
import './activity.css';

// Imported icons ====>
import { BsArrowRightShort } from 'react-icons/bs';

// Imported assets
import tesspic from '../../../Assets/StatElements/TessStat.png';

const Activity = () => {
    return (
        <div className="activitySection">
            <div className="heading flex">
                <h1>Recent Activity</h1>
                <button className="btn flex">
                    See all activity <BsArrowRightShort />
                </button>
            </div>
            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <img src={tesspic} alt="Customer image" />
                    <div className="customerDetails">
                        <span className="name">Liam Arbuckle</span> {/* Static data - import from realtime supa later */}
                        <small>Ordered a new spaceship</small> {/* Ditto */}
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
                <div className="singleCustomer flex">
                    <img src={tesspic} alt="Customer image" />
                    <div className="customerDetails">
                        <span className="name">Liam Arbuckle</span> {/* Static data - import from realtime supa later */}
                        <small>Ordered a new spaceship</small> {/* Ditto */}
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
                <div className="singleCustomer flex">
                    <img src={tesspic} alt="Customer image" />
                    <div className="customerDetails">
                        <span className="name">Liam Arbuckle</span> {/* Static data - import from realtime supa later */}
                        <small>Ordered a new spaceship</small> {/* Ditto */}
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
                <div className="singleCustomer flex">
                    <img src={tesspic} alt="Customer image" />
                    <div className="customerDetails">
                        <span className="name">Liam Arbuckle</span> {/* Static data - import from realtime supa later */}
                        <small>Ordered a new spaceship</small> {/* Ditto */}
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
                <div className="singleCustomer flex">
                    <img src={tesspic} alt="Customer image" />
                    <div className="customerDetails">
                        <span className="name">Liam Arbuckle</span> {/* Static data - import from realtime supa later */}
                        <small>Ordered a new spaceship</small> {/* Ditto */}
                    </div>
                    <div className="duration">
                        2 min ago
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity;