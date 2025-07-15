import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import Home from './components/Home';
import Auctions from './components/Auctions';
import Bid from './components/Bid';
import { BrowserRouter, Route, Routes } from 'react-router';

const API_URL = process.env.REACT_APP_API_URL;
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

export default function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/bids" element={<Bid />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

