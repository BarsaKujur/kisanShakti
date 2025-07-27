import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Buy from './Pages/Buy';
import Sell from './Pages/Sell';
import CropAdvisor from './Pages/CropAdvisor';
import Weather from './Pages/Weather';
import Learn from './Pages/Learn';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ProductDetails from './Pages/ProductDetails';
import ChatPage from './Pages/ChatPage';
import ProfilePage from './Pages/ProfilePage';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import CartPage from './Pages/CartPage';
import OrderConfirmation from './Pages/OrderConfirmation';
import FarmerDashboard from './Components/DashBoard/FarmerDashboard';
import ExpertDashboard from './Components/DashBoard/ExpertDashboard';
import LiveMarketPrice from './Pages/LiveMarketPrice';
// import BuyerDashBoard from './Components/DashBoard/BuyerDashBoard';
function App() {
  
  return (
    <>
    <BrowserRouter>
    <NavBar/>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/cropadvisor" element={<CropAdvisor />} />
        <Route path="/weather" element={<Weather />} />
         <Route path="/livemarketprice" element={<LiveMarketPrice />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
         <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        {/* <Route path="/buyer-dashboard" element={<BuyerDashboard />} /> */}
        <Route path="/expert-dashboard" element={<ExpertDashboard />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
