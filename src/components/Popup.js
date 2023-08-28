import React from 'react';
import '../style/Popup.css'
import CloseIcon from '@mui/icons-material/Close';

function Popup({ conference, onClose }) {
    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className='btn'>
                    <button className='close-button' onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <img className='banner' src={conference.banner_image} />
                <div className='time_box'>
                <p className='time'>{conference.date_time}</p>
                </div>
                <h3 className='title'>{conference.title}</h3>
                <p className='description'>{conference.description}</p>
                <div className='footer'>
                    <div className='org'>
                        <img className='org_img' src={conference.organiser_icon} />
                        <p className='org_name'>{conference.organiser_name}</p>
                    </div>
                    <div className='venue'>
                        <div className='venue_city'>
                            <p>{conference.venue_city}&#10240;|</p>
                            <p>&#10240;{conference.venue_country}</p>
                        </div>
                        <p className='place'>{conference.venue_name}</p>
                    </div>
                </div>
                {/* Other conference details */}
            </div>
            <div className='popup-backdrop' onClick={onClose} />
        </div>
    );
}

export default Popup;