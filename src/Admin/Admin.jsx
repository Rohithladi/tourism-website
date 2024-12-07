import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImage from '../images/bg.jpg'; // Update this with a travel-related background image4
import {  FaPhoneAlt, FaCalendarAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa'; // Importing icons from react-icons


// Import Font Awesome icons
import { FaUser, FaMapMarkerAlt, FaSave, FaCloudUploadAlt } from 'react-icons/fa';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('welcome');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        if (activeTab === 'viewUsers') {
            axios.get('http://localhost:8080/api/users/all')
                .then(response => setUsers(response.data))
                .catch(error => console.error('Error fetching users:', error));
        }

        if (activeTab === 'viewDestinations') {
            axios.get('http://localhost:8080/api/bookings')
                .then(response => setBookings(response.data))
                .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [activeTab]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('imageFile', image);

        try {
            await axios.post('http://localhost:8080/api/destination', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Destination added successfully');
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            setMessage('Error adding destination');
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword && selectedUser) {
            try {
                await axios.put(`http://localhost:8080/api/users/${selectedUser.id}/update-password`, { password: newPassword });
                setMessage('Password updated successfully');
                setSelectedUser(null);
                setNewPassword('');
            } catch (error) {
                setMessage('Error updating password');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            setMessage('User deleted successfully');
        } catch (error) {
            setMessage('Error deleting user');
        }
    };

    return (
        <div className="flex bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="w-1/4 bg-gradient-to-b from-teal-800 to-teal-500 text-white p-5 space-y-5 min-h-screen">

                <h2 className="text-3xl font-bold mb-5 animate__animated animate__fadeInDown">Admin Dashboard</h2>

                {/* Tourism Buttons with Animated Icons */}
                <button
                    onClick={() => setActiveTab('addDestination')}
                    className={`w-full p-3 text-left rounded-lg ${activeTab === 'addDestination' ? 'bg-yellow-500' : 'bg-teal-600'} hover:bg-yellow-400 transition ease-in-out duration-300`}
                >
                    <FaMapMarkerAlt className="mr-2 inline-block animate__animated animate__bounceIn" /> Add Destination
                </button>

                <button
                    onClick={() => setActiveTab('viewUsers')}
                    className={`w-full p-3 text-left rounded-lg ${activeTab === 'viewUsers' ? 'bg-yellow-500' : 'bg-teal-600'} hover:bg-yellow-400 transition ease-in-out duration-300`}
                >
                    <FaUser className="mr-2 inline-block animate__animated animate__bounceIn" /> View Users
                </button>
                <button
                    onClick={() => setActiveTab('viewDestinations')}
                    className={`w-full p-3 text-left rounded-lg ${activeTab === 'viewDestinations' ? 'bg-yellow-500' : 'bg-teal-600'} hover:bg-yellow-400 transition ease-in-out duration-300`}
                >
                    <FaMapMarkerAlt className="mr-2 inline-block animate__animated animate__bounceIn" /> View Bookings
                </button>

            </div>

            {/* Right Section: Content */}
            <div className="w-3/4 p-5 bg-white opacity-90 rounded-l-3xl">
                {activeTab === 'welcome' ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center animate__animated animate__fadeIn">
                            <h2 className="text-4xl font-bold mb-4 text-teal-700">Welcome Admin</h2>
                            Hello <span className="font-bold text-yellow-500">Rishitha</span>, choose a task from the left menu to get started.                        </div>
                    </div>
                ) : activeTab === 'addDestination' ? (
                    <div>
                        <h2 className="text-3xl font-bold mb-5 text-teal-700 animate__animated animate__fadeIn">
                            Add Destination
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <label className="block font-semibold text-teal-600">Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border rounded-lg border-teal-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold text-teal-600">Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 border rounded-lg border-teal-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold text-teal-600">Image:</label>
                                <div className="relative w-full">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    <div className="bg-teal-500 hover:bg-teal-400 text-white p-4 rounded-lg text-center flex items-center justify-center">
                                        <FaCloudUploadAlt className="mr-2" />
                                        {image ? image.name : 'Choose an image'}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-400 transition duration-300 ease-in-out">
                                <FaSave className="mr-2 inline-block animate__animated animate__shakeX" /> Add Destination
                            </button>
                        </form>
                        {message && <p className="mt-4 text-green-500 animate__animated animate__fadeIn">{message}</p>}
                    </div>
                ) : activeTab === 'viewUsers' ? (
                    <div>
                        <h2 className="text-3xl font-bold mb-5 text-teal-700 animate__animated animate__fadeIn">
                            Users List
                        </h2>
                        {users.length > 0 ? (
                            <ul className="space-y-6 animate__animated animate__fadeInUp">
                                {users.map((user) => (
                                    <li key={user.id} className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition ease-in-out duration-200">
                                        <div className="space-y-3">
                                            <p className="font-semibold text-lg">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                            <p className="text-sm text-gray-600">Username: {user.username}</p>
                                        </div>

                                        {/* Buttons with animated touch */}
                                        <div className="mt-4 space-x-4">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
                                            >
                                                <FaUser className="mr-2 inline-block animate__animated animate__bounceIn" /> Edit Password
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-400 transition duration-300 ease-in-out transform hover:scale-105"
                                            >
                                                <FaMapMarkerAlt className="mr-2 inline-block animate__animated animate__bounceIn" /> Delete User
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No users found.</p>
                        )}

                        {selectedUser && (
                            <div className="mt-6 bg-gray-200 p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-teal-700">Edit Password for {selectedUser.username}</h3>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-3 border rounded-lg mt-3"
                                />
                                <button
                                    onClick={handlePasswordChange}
                                    className="mt-4 bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-400"
                                >
                                    Update Password
                                </button>
                            </div>
                        )}
                    </div>
                ) : null}

                {activeTab === 'viewDestinations' ? (
                    <div>
                        <h2 className="text-3xl font-bold mb-5 text-teal-700 animate__animated animate__fadeIn">
                            Bookings List
                        </h2>
                        {bookings.length > 0 ? (
                            <ul className="space-y-6 animate__animated animate__fadeInUp">
                            {bookings.map((booking) => (
                              <li key={booking.id} className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition ease-in-out duration-200">
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <FaUser className="text-gray-600" />
                                    <p className="text-sm text-gray-600">User: {booking.name}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FaPhoneAlt className="text-gray-600" />
                                    <p className="text-sm text-gray-600">Phone: {booking.phone}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FaCalendarAlt className="text-gray-600" />
                                    <p className="text-sm text-gray-600">Check-In: {booking.checkIn}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FaCalendarAlt className="text-gray-600" />
                                    <p className="text-sm text-gray-600">Check-Out: {booking.checkOut}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FaCreditCard className="text-gray-600" />
                                    <p className="text-sm text-gray-600">Payment Method: {booking.paymentMethod}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <FaCheckCircle className="text-green-500 animate__animated animate__pulse" />
                                    <p className="text-sm text-gray-600">Payment Status: Completed</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                            <p className="text-gray-600">No bookings found.</p>
                        )}
                    </div>
                ) : null}

            </div>
        </div>
    );
};

export default Admin;
