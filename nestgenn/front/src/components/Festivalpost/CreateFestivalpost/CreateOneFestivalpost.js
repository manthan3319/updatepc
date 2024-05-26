import React, { useState } from 'react';
import "./CreateOneFestivalpost.css";
import bgimage from '../../../images/businessman-pointing-his-presentation-futuristic-digital-screen.jpg';
import Topline from '../../Topline/Topline';
import { Link } from 'react-router-dom';
import Logo from '../../../images/80f67-coin.png';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import bgimage2 from '../../../images/img1.jpeg';
import Dewali from '../../../fastivalimage/49-Diwali.jpg';

const CreateOneFestivalpost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 1; // Show only one card per page

    const FastivalPost = [
        {
            id: 1,
            Date: '17/04/2024',
            Fname: 'Ram Navami',
            backgroundImage: bgimage2
        },
        {
            id: 2,
            Date: '17/10/2025',
            Fname: 'Dewali',
            backgroundImage: Dewali
        },
    ];

    const CustomerData = [
        {
            id: 1,
            Number: 8849088685,
            BusinessAddress: "302,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Arham",
            logoUrl: Logo,
            festivalPostId: 1
        }
    ];

    const handleDownload = async (cardId, festivalName) => {
        const element = document.getElementById(`poster-${cardId}`);
        if (!element) {
            console.error(`Element with ID poster-${cardId} not found`);
            return;
        }
        // Add the full-size class before generating the canvas
        element.classList.add('full-size');
        try {
            const canvas = await html2canvas(element);
            canvas.toBlob((blob) => {
                saveAs(blob, `${festivalName}_poster.png`);
                // Remove the full-size class after downloading
                element.classList.remove('full-size');
            });
        } catch (error) {
            console.error('Error generating canvas:', error);
            // Remove the full-size class if there's an error
            element.classList.remove('full-size');
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalCards = FastivalPost.length * CustomerData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const currentIndex = (currentPage - 1) * cardsPerPage;
    const currentCustomer = Math.floor(currentIndex / FastivalPost.length);
    const currentFestival = currentIndex % FastivalPost.length;

    const pageNumbers = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage > 3 && currentPage < totalPages - 2) {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        } else {
            pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        }
    }

    return (
        <>
            <Topline />
            <div className='float-left dashboard w-[100%] relative' style={{ backgroundImage: `url(${bgimage})` }}>
                <div className="absolute inset-0 bg-[#13131a] opacity-95"></div>
                <div className='lg:max-w-[1440px] lg:px-[20px] mt-[20px]'>
                    <div className='dashbord-container mb-[50px]'>
                        <div className='w-[10%]'>
                            <Link to="/Festivalpost" className='flex gap-[10px] text-gray-400 text-[14px] font-sans bg-[#292932] hover:opacity-40 p-[10px] rounded-[4px] '>
                                <span><i className="fa fa-backward" aria-hidden="true"></i></span>
                                Back
                            </Link>
                        </div>
                        <div className='FestivalPoster lg:mt-[38px] flex flex-wrap gap-[20px] mb-[80px] justify-center'>
                            <section key={`${CustomerData[currentCustomer].id}-${FastivalPost[currentFestival].id}`} id={`card-${CustomerData[currentCustomer].id}-${FastivalPost[currentFestival].id}`} className='mb-[10px]' >
                                <div id={`poster-${CustomerData[currentCustomer].id}-${FastivalPost[currentFestival].id}`} className='festival-poster-container' style={{ backgroundImage: `url(${FastivalPost[currentFestival].backgroundImage})` }}>
                                    <div className='p-[10px]'>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p className="text-[45px] font-semibold">+91 {CustomerData[currentCustomer].Number}</p>
                                            </div>
                                            <div>
                                                <img src={CustomerData[currentCustomer].logoUrl} alt='logo' className='w-[250px] m-auto' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-container mt-[850px]'>
                                        <p className='text-center w-[90%] font-semibold text-white text-[35px] font-sans p-[10px] break-words'>
                                            {CustomerData[currentCustomer].BusinessAddress ? CustomerData[currentCustomer].BusinessAddress : `${CustomerData[currentCustomer].BusinessName} તરફથી ${FastivalPost[currentFestival].Fname} ની હાદિક શુભકામનાઓ`}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-2'>
                                    <button onClick={() => handleDownload(`${CustomerData[currentCustomer].id}-${FastivalPost[currentFestival].id}`, FastivalPost[currentFestival].Fname)} className='bg-gray-600 text-white px-3 py-1 rounded'>
                                        Download
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className="pagination text-center">
                            {pageNumbers.map((number, index) => (
                                <button
                                    key={index}
                                    onClick={() => number !== '...' && paginate(number)}
                                    className={`mr-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-gray-600 text-white' : 'text-gray-500'}`}
                                    disabled={number === '...'}
                                >
                                    {number}
                                </button>
                            ))}
                            {currentPage < totalPages && (
                                <button onClick={() => paginate(currentPage + 1)} className='bg-gray-600 ml-1 px-3 py-1 border rounded text-white'>Next</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateOneFestivalpost;
