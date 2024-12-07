import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Contact from './pages/contact'; // Ensure the file is named Contact.jsx
import AboutUs from './pages/Aboutus'; // Ensure the file is named AboutUs.jsx
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import Blog from './pages/Blog';
import Signup from './authenticate/Signup';
import Login from './authenticate/Login';
import Dashboard from './authenticate/Dashboards'; // Ensure the file is named Dashboard.jsx
import Map from './pages/Map';
import Overview from './pages/DestinationOverview'; // Ensure the file is named DestinationOverview.jsx
import Admin from './Admin/Admin';
import Booking from './Bookings/Booking';
import Hotel from './Bookings/Hotel';
import Journey from './Bookings/Journey';
import Payment from './Bookings/Payments';
import Personal from './Bookings/Personal';
import Summarys from './Bookings/Summarys';
import Thankyou from './Bookings/Thankyou';
import Loader from './Bookings/Loader';
import Loaders from './pages/Loaders';
import ViewBooking from './authenticate/ViewBooking';


function App() {
  return (


    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/destination/:destinationId" element={<Overview />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/HotelSelection" element={<Hotel />} />
        <Route path="/JourneyTypeSelection" element={<Journey />} />
        <Route path="/JourneyTypeSelection" element={<Journey />} />
        <Route path="/PersonalDetailsForm" element={<Personal />} />
        <Route path="/BookingSummary" element={<Summarys />} />
        <Route path="/payment-selection" element={<Payment totalPrice={100.00} />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        <Route path="/Loader" element={<Loader />} />
        <Route path="/Loaders" element={<Loaders />} />
        <Route path="/ViewBooking" element={<ViewBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
