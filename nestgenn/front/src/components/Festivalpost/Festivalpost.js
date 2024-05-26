import React, { useState } from 'react';
import Topline from '../Topline/Topline';
import bgimage from '../../images/businessman-pointing-his-presentation-futuristic-digital-screen.jpg';
import { Sheet } from 'react-modal-sheet';
import './Festivalpost.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Festivalpost = () => {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [amount, setAmount] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showTable, setShowTable] = useState(false); // Add this state

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            setLogo(e.target.files[0]);
            setLogoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const fetchCustomers = async () => {
        setIsLoading(true); // Set loading state
        try {
            const response = await axios.post('http://localhost:7000/api/v1/Festivalpost/getFestivalpostcustomer', {});
            if (response.status === 200) {
                setCustomers(response.data.data.Data);
                setFilteredCustomers(response.data.data.Data); // Set filtered customers to all customers initially
            } else {
                console.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = customers.filter((customer) => {
            return (
                customer.name.toLowerCase().includes(term) ||
                customer.number.includes(term) ||
                customer.businessName.toLowerCase().includes(term)
            );
        });
        setFilteredCustomers(filtered);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const LogoAdd = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('FestivalpostLogo', logo);
            formData.append('name', name);
            formData.append('number', mobileNumber);
            formData.append('businessName', businessName);
            formData.append('businessAdress', businessAddress);

            const response = await axios.post('http://localhost:7000/api/v1/Festivalpost/addimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Customer added successfully');
            } else {
                console.error('Failed to add customer');
                setIsUploading(false);
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            setIsUploading(false);
        }
    };

    const addCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:7000/api/v1/Festivalpost/addcustomer', {
                name,
                number: mobileNumber,
                businessName,
                amount,
                businessAdress: businessAddress,
                logoName: logo ? logo.name : '',
            });

            if (response.status === 200) {
                LogoAdd();
                toast.success('Customer Detail added successfully!');
            } else {
                console.error('Failed to add customer');
                setIsUploading(false);
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            setIsUploading(false);
        }
    };

    const handleViewCustomers = () => {
        setShowTable(true); // Show the table
        fetchCustomers(); // Fetch customers when the table is to be displayed
    };

    return (
        <>
            <Topline />
            <div
                className='float-left dashboard w-[100%] relative'
                style={{ backgroundImage: `url(${bgimage})` }}
            >
                <div className="absolute inset-0 bg-[#13131a] opacity-95"></div>
                <div className='lg:max-w-[1440px] lg:px-[20px] mt-[20px] relative z-10'>
                    <div className='dashbord-container'>
                        <div className='MenuFestival'>
                            <ul className='flex lg:gap-[15px] bg-[#1c1c24] py-[8px] px-[10px] rounded-[4px]'>
                                <li className='text-gray-400 text-[14px] font-sans bg-[#292932] hover:opacity-40 p-[10px] rounded-[4px]' onClick={() => setOpen(true)}> <Link to="#">Add Customer</Link></li>
                                <li className='text-gray-400 text-[14px] font-sans bg-[#292932] hover:opacity-40 p-[10px] rounded-[4px]' onClick={handleViewCustomers}> <Link to="#">View Customer</Link></li>
                                <li className='text-gray-400 text-[14px] font-sans bg-[#292932] hover:opacity-40 p-[10px] rounded-[4px]' > <Link to="/CreateFestivalpost">Create Fastival Post</Link></li>
                            </ul>
                        </div>
                        <div className='add_customer'>
                            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                                <Sheet.Container className='sheet_container' style={{ left: 'none', bottom: '-80px' }}>
                                    <Sheet.Header>
                                        <button onClick={() => setOpen(false)} className="closebtnshett absolute top-0 right-0 mr-4 mt-2 text-gray-400 hover:text-gray-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </Sheet.Header>
                                    <Sheet.Content>
                                        <div className="p-4">
                                            <h2 className="text-[18px] font-semibold mb-4 text-center text-gray-400 font-sans">Add Customer</h2>
                                            <form onSubmit={addCustomer} className='mt-[40px]'>
                                                <div className="flex lg:flex-row lg:gap-[20px]" >
                                                    <div className="mb-4 lg:w-[50%]">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            value={name}
                                                            placeholder='Enter Name'
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                    <div className="mb-4 lg:w-[50%]">
                                                        <input
                                                            type="number"
                                                            id="mobileNumber"
                                                            value={mobileNumber}
                                                            placeholder='Enter Number'
                                                            onChange={(e) => setMobileNumber(e.target.value)}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex lg:flex-row lg:gap-[20px]">
                                                    <div className="mb-4 w-[50%]">
                                                        <input
                                                            type="text"
                                                            id="businessName"
                                                            placeholder='Enter Business Name'
                                                            value={businessName}
                                                            onChange={(e) => setBusinessName(e.target.value)}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                    <div className="mb-4 w-[50%]">
                                                        <input
                                                            type="text"
                                                            id="amount"
                                                            placeholder='Enter Yearly Amount'
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex lg:flex-row lg:gap-[20px]">
                                                    <div className="mb-4 w-[100%]">
                                                        <input
                                                            type="text"
                                                            id="businessAddress"
                                                            placeholder='Enter Business Address'
                                                            value={businessAddress}
                                                            onChange={(e) => setBusinessAddress(e.target.value)}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex lg:flex-row lg:gap-[20px]">
                                                    <div className="mb-4 w-[100%]">
                                                        <input
                                                            type="file"
                                                            id="logo"
                                                            placeholder='Business Logo'
                                                            onChange={handleLogoChange}
                                                            className="shadow appearance-none border rounded w-full p-[10px] text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-[#1c1c244f] border-none text-[15px] font-sans"
                                                        />
                                                    </div>
                                                </div>
                                                {logoPreview && (
                                                    <div className="mb-4">
                                                        <img src={logoPreview} alt="Logo Preview" className="w-[80px] h-auto" />
                                                    </div>
                                                )}
                                                {isUploading && <div className="loader">Uploading...</div>}
                                                {!isUploading && (
                                                    <div className="flex items-center justify-center lg:mt-[50px]">
                                                        <button
                                                            type="submit"
                                                            className="bg-[#1c1c24] hover:bg-[#1c1c244f] font-sans text-white w-[25%] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </Sheet.Content>
                                </Sheet.Container>
                                <Sheet.Backdrop />
                            </Sheet>
                        </div>
                        {showTable && (
                            <div>
                                {isLoading ? (
                                    <p className='text-gray-300 font-sans'>Loading...</p>
                                ) : (
                                    customers.length > 0 ? (
                                        <div className='view_all_customer w-full mt-5'>
                                            <input
                                                type="text"
                                                placeholder="Search by name, number, or business name"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                                className="p-2 border rounded mb-4 text-[14px] outline-none font-sans bg-[#292932] border-none text-gray-300"
                                            />
                                            <table className='w-full bg-[#292932] rounded-[4px]' style={{ borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>S.No</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Name</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Number</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Business Address</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Business Name</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Yearly Amount</th>
                                                        <th className="font-sans text-[15px]" style={{ border: '1px solid #dddddd26', padding: '8px', color: '#fff', textAlign: 'left' }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentCustomers.map((customer, index) => (
                                                        <tr key={customer._id}>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{indexOfFirstCustomer + index + 1}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.name}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.number}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.businessAdress}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.businessName}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.amount}</td>
                                                            <td className="text-[14px] text-gray-300 font-sans" style={{ border: '1px solid #dddddd26', padding: '8px' }}>{customer.isEnabled && !customer.isDeleted ? 'Active' : 'Inactive'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mt-3 flex justify-center">
                                                {[...Array(Math.ceil(filteredCustomers.length / customersPerPage)).keys()].map((number) => (
                                                    <button
                                                        key={number}
                                                        onClick={() => paginate(number + 1)}
                                                        className={`mr-1 px-3 py-1 border rounded ${currentPage === number + 1 ? 'bg-gray-600 text-white' : 'text-gray-500'}`}
                                                    >
                                                        {number + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No customers found.</p>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    );
};

export default Festivalpost;
