import React, { useEffect, useState } from 'react';
import '../style/Conferences.css';
import Popup from './Popup';

function Conferences() {
    const API = "https://gdscdev.vercel.app/api";
    const conferencesPerPage = 3;
    const maxVisiblePageNumbers = 3;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedConference, setSelectedConference] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = (conference) => {
        setSelectedConference(conference);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedConference(null);
        setIsPopupOpen(false);
    };

    const fetchApiData = async (url) => {
        try {
            let result = await fetch(url);
            result = await result.json();
            setData(result.content.data);
        } catch (error) {
            console.log(error);
        }
    };

    const truncateDescription = (description) => {
        const firstFullStop = description.indexOf('.');
        if (firstFullStop !== -1) {
            return description.substring(0, firstFullStop + 1);
        } else {
            return description;
        }
    };

    const totalPages = Math.ceil(data.length / conferencesPerPage);

    const generatePageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= maxVisiblePageNumbers) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage === 1) {
            for (let i = 1; i <= maxVisiblePageNumbers; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage === totalPages) {
            for (let i = totalPages - maxVisiblePageNumbers + 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const middlePage = Math.floor(maxVisiblePageNumbers / 2);
            for (let i = currentPage - middlePage; i <= currentPage + middlePage; i++) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchApiData(API);
    }, []);
    console.log(data)

    const startIndex = (currentPage - 1) * conferencesPerPage;
    const endIndex = startIndex + conferencesPerPage;
    const visibleConferences = data.slice(startIndex, endIndex);

    return (
        <div>
            <h2 className='heading'>TECH CONFERENCES</h2>
            <p className='para'>Whether you are a developer, a designer, or an entrepreneur, there is a tech conference for you. Explore these amazing events and learn from the experts.</p>
            <div className='container'>
                {visibleConferences.map(item => (
                    <div key={item.id} className='card' onClick={() => openPopup(item)}>
                        <img src={item.banner_image} alt={item.title} />
                        <h3 className='title'>{item.title}</h3>
                        <p>{truncateDescription(item.description)}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <button className='previous' onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                )}
                {generatePageNumbers().map(pageNumber => (
                    <button
                        id='page'
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={currentPage === pageNumber ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button className='next' onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                )}
            </div>
            {isPopupOpen && (
                <Popup
                    conference={selectedConference}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}

export default Conferences;