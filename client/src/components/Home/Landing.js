import BuyCard from "./BuyCard";
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"
import {CssBaseline } from '@mui/material';

function Landing() {

  let navigate = useNavigate();

  const goToAuctions = () =>{
    navigate("/auctions");
  }

  const goToLogin = () =>{
    navigate("/login");
}

const kind = [
  {
    title: 'Sell',
    description:
      "Selling with us is rather easy. You have absolute control over the price, duration of the auction and availability for immediate purchase. All you have to do is create an account and when you are confirmed you are ready to post your first listing!",
    imageUrl: "https://localhost:33123/images/kobuR.jpg",
    time: 1500,
  },
  {
    title: 'Buy',
    description:
      'In our auctions, items are bid on and sold to the highest bidder on a public sale. We ensure a safe transaction between seller and buyer and you can communicate securely within our mail app. Feel free to explore our catalogue before joining here!',
    imageUrl: "https://localhost:33123/images/saadR.jpg",
    time: 1500,
  },
];

  return (
    <div  style={{     minHeight: '100vh', width: '100%',
        backgroundColor:'#ADEFD1FF'
       }}>
      
      <CssBaseline />
      <AppBar style={{backgroundColor: '#00203FFF', }} elevation={0}>
        <Toolbar style={{width: '80%',
    margin: '0 auto', }}>
          <h1 style={{    flexGrow: '1', fontSize: '2.6rem', color: '#fff',fontFamily:'Roboto Slab' }}  >
          Bidders Bay
          </h1>
          <IconButton style={{color:'#fff',fontFamily:'Roboto Slab'}} onClick={goToLogin}>
            Login  
            <ExitToAppIcon style={{    color: '#fff',
    fontSize: '2rem', }} />
          </IconButton>
        </Toolbar>
      </AppBar>
        <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        }} 
        >
          <div style={{marginTop:'5rem'}} onClick={goToAuctions}>
        <BuyCard kind={kind[1]} /></div>
        <div onClick={goToLogin}>
        <BuyCard kind={kind[0]}  />
        </div>
      </div>
    </div>
  );
}

export default Landing
