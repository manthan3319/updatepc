import React, { useState } from 'react';
import "./CreateFestivalpost.css";
import bgimage from '../../../images/businessman-pointing-his-presentation-futuristic-digital-screen.jpg';
import Topline from '../../Topline/Topline';
import { Link } from 'react-router-dom';
import Logo from '../../../images/80f67-coin.png';
import ramnavmi1 from '../../../fastivalimage/ramnavmi1.png';
import ramnavmi2 from '../../../fastivalimage/ramnavmi2.png';
import ramnavmi3 from '../../../fastivalimage/ramnavmi3.png';
import ramnavmi4 from '../../../fastivalimage/ramnavmi4.png';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import bgimage2 from '../../../images/img1.jpeg';

const CreateFestivalpost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 1; // Show only one card per page

    const FastivalPost = [
        {
            id: 1,
            Date: '17/04/2024',
            Fname: 'Ram Navami',
            Fimages: [
                ramnavmi1,
                ramnavmi2,
                ramnavmi3,
                ramnavmi4
            ]
        }
    ];

    const CustomerData = [
        {
            id: 1,
            Number: 8849088685,
            BusinessAddress: "302,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Arham",
            logoUrl: Logo,
            festivalPostId: 1
        },
        {
            id: 2,
            Number: 9898754527,
            BusinessAddress: "303,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Example",
            logoUrl: Logo,
            festivalPostId: 1
        },
        {
            id: 3,
            Number: 9904012350,
            BusinessAddress: "303,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Example",
            logoUrl: Logo,
            festivalPostId: 1
        },
        {
            id: 4,
            Number: 2145121545,
            BusinessAddress: "303,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Example",
            logoUrl: Logo,
            festivalPostId: 1
        },
        {
            id: 5,
            Number: 2145121545,
            BusinessAddress: "303,Aarihi Complex,opposite Ganesh plaza, Navrangpura,Ahmedabad-38009",
            BusinessName: "Example",
            logoUrl: Logo,
            festivalPostId: 1
        },
        {
            id: 6,
            Number: 2145121545,
            BusinessName: "Example",
            logoUrl: Logo,
            festivalPostId: 1
        },
    ];

    const handleDownload = async (cardId) => {
        const element = document.getElementById(`poster-${cardId}`);
        if (!element) {
            console.error(`Element with ID poster-${cardId} not found`);
            return;
        }
        try {
            const canvas = await html2canvas(element);
            canvas.toBlob((blob) => {
                saveAs(blob, 'festival_poster.png');
            });
        } catch (error) {
            console.error('Error generating canvas:', error);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCustomerData = CustomerData.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(CustomerData.length / cardsPerPage);
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
                            {currentCustomerData.map((customer) => (
                                <section key={customer.id} id={`card-${customer.id}`} className='mb-[10px]' >
                                    <div id={`poster-${customer.id}`} className='festival-poster-container' style={{ backgroundImage: `url(${bgimage2})` }}>
                                        <div className='p-[10px]'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <p className="text-[45px] font-semibold">+91 {customer.Number}</p>
                                                </div>
                                                <div>
                                                    <img src={customer.logoUrl} alt='logo' className='w-[250px] m-auto' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-container mt-[850px]'>
                                            <p className='text-center w-[90%] font-semibold text-white text-[35px] font-sans p-[10px] break-words'>
                                                {customer.BusinessAddress ? customer.BusinessAddress : `${customer.BusinessName} તરફથી ${FastivalPost[customer.festivalPostId - 1].Fname} ની હાદિક શુભકામનાઓ`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center mt-2'>
                                        <button onClick={() => handleDownload(customer.id)} className='bg-gray-600 text-white px-3 py-1 rounded'>
                                            Download
                                        </button>
                                    </div>
                                </section>
                            ))}
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

export default CreateFestivalpost;
