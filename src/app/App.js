// import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import Home from '../components/Home';
import Auctions from '../components/Auctions';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuctionList from '../features/Auctions/AuctionsList';
import Login from '../features/auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuctionPage } from '../features/Auctions/AuctionPage';
// import AuctionList from '../features/Auctions/AuctionsList';

import { Toaster } from "sonner";
import UserBidsPage from '../features/Bids/UserBidsPage';


export default function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog/all" element={
            <ProtectedRoute>
                  <Layout>
                    <AuctionList />
                  </Layout>
            </ProtectedRoute>} />
          <Route path="/bids" element={
            <ProtectedRoute>
              <Layout>
                <UserBidsPage />
              </Layout>
            </ProtectedRoute>} />
            <Route path="/auction" element={
            <ProtectedRoute>
              <Layout>
                <AuctionPage />
              </Layout>
            </ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
    <Toaster />
    </>
  );
}

