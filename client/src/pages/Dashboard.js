import React, {useContext,useEffect, useState} from 'react';
import {AuthContext} from '../components/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import {Rating,Typography,Divider} from '@mui/material';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';
import {Grid} from '@mui/material';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import Recommendations from '../components/Modals/Recommendations';
import FilterItems from '../components/Searching/FilterItems';

function Dashboard() {

    const {authState} = useContext(AuthContext);
    let navigate=useNavigate();
    let id = authState.id;
    const [userInfo, setUserInfo]= useState({});
    const [myItems, setMyItems] = useState([]);
    const [myPastItems, setMyPastItems] = useState([]);
    const [myWatchlist, setMyWatchlist] = useState([]);
    const [gotMail, setGotMail] = useState(false);

    useEffect(()=>{

            axios.get(`https://localhost:33123/auth/fetchyall/${id}`).then((response)=>{
                if(response.data.message){
                      console.log(response.data.message);
                      navigate('/');
                }
                else{
            
                    setUserInfo(response.data);

                    // check if they have mail
                    axios.get(`https://localhost:33123/mail/newmail/${id}`).then((respi)=>{

                        if(respi.data.gotmail===true){
                            setGotMail(true);
                         }
                    }).catch((error) => {});

                    axios.get(`https://localhost:33123/items/fetchByUser/${id}`).then((res)=>{
                        
                        const available = res.data.filter((value)=>{
                            return (value.state==='EXPECTED' || value.state==='AVAILABLE' );
                        });
                        const past = res.data.filter((value)=>{
                            return (value.state==='PURCHASED' || value.state==='EXPIRED' );
                        });
                  
                        setMyItems(available);
                        setMyPastItems(past);
        
                        }).catch((error) => {
                            navigate('/');
                    });

                    axios.get(`https://localhost:33123/items/mywatchlist/${id}`).then((resbidy)=>{
                        setMyWatchlist(resbidy.data);
                    }).catch((error) => {
                        navigate('/');
                    });

                }
            }).catch((error) => {
                console.log(error);
                navigate('/');
            });
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gotMail]);

    return (
        <div>
            
            <div style={{float:'left'}}>
            <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h4' >{`${userInfo.name} ${userInfo.surname}`}</Typography>
            </div>

            <Grid container spacing={2}>

                <Grid item xs={10}> 
                    <div className="searchInputs">
                    <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h6' >@{`${userInfo.username}`}</Typography>
                    </div>
                    <br></br>
                    <div className="searchInputs">

                    <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h7' >{`${userInfo.location}, ${userInfo.country}`}</Typography>
                        
                        { <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                flexWrap: 'wrap',
                                backgroundColor:'#00203FFF',
                                color:'white',
                                borderRadius:'10px',
                                padding:'10px',
                                marginLeft:'5px'

                                }}>
                            <PointOfSaleSharpIcon />
                            { userInfo.saleCount ? 
                            (   <>&nbsp;Seller Rating: {userInfo.sellerRating} &nbsp; Average: &nbsp;
                                <Rating name="read-only" value= {userInfo.sellerRating/userInfo.saleCount } readOnly precision={0.5}/>
                                </>
                            )
                            :
                            (   <>&nbsp;No Sales Yet
                                </>
                            )
                            } 
                            </div>} 

                        { <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                flexWrap: 'wrap',
                                backgroundColor:'#00203FFF',
                                color:'white',
                                borderRadius:'10px',
                                padding:'10px',
                                marginLeft:'5px'
                                }}>
                            <ShoppingBagSharpIcon />
                            { userInfo.buyCount ? 
                            (<>
                            &nbsp;Bidder Rating: {userInfo.bidderRating} &nbsp; Average: &nbsp;
                            <Rating name="read-only" value={userInfo.bidderRating/userInfo.buyCount } readOnly precision={0.5}/>
                            </>)
                            :
                            (<>
                            &nbsp;No Purchases Yet
                            </>
                            )
                            }
                            </div>} 

                    </div>

                </Grid>
            </Grid>
                    

            <Recommendations /> 
            <br></br>
            <Divider variant='fullWidth' sx= {{backgroundColor:'black'}}/> 
            <br></br> 
             
            <div className="profileContainer">
                <div className="informationSection">


                    <div className='container'>

                    <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h4' >Active Auctions</Typography>
                    
                        </div>
                    
                        { myItems.length!==0 ? 
                            <div className='container'>
                                 <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >The catalogue of your current listings</Typography>
                            </div>
                            :
                            <div className='container'>
                                <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >No listings yet!</Typography>
                            </div>
                        }

                    <div className='container'>

                        <div>
                            <FilterItems items={myItems} />
                        </div>
                    
                    </div>

                    <div className='container'>
                        <button className="buttonito" onClick={ ()=> {navigate('/createitem')}}>CREATE A NEW AUCTION</button>
                    </div>

                    <br />
                    <div className='container'>
                    <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h4' >WatchList</Typography>
                    </div>

                    { myWatchlist.length!==0 ? 
                    <div className='container'>
                        <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >See the items you are currently bidding on</Typography>
                    </div>
                    :
                    <div className='container'>
                        <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >Bid on an auction</Typography>
                    </div>
                    }
                    <div className='container'>
                        <FilterItems items={myWatchlist} /> 
                    </div>

                    <br />
                    <div className='container'>                    
                    <Typography style={{backgroundColor:'#00203FFF',fontFamily:'Roboto Slab',color:'white',borderRadius:'10px',padding:'10px'}} variant='h4' >Past Auctions</Typography>
                    </div>

                    { myPastItems.length!==0 ? 
                        <div className='container'>
                           <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >See your past listings</Typography>
                        </div>
                    :
                        <div className='container'>
                             <Typography style={{fontFamily:'Roboto Slab',color:'navy',borderRadius:'10px',padding:'10px'}} variant='h6' >You have no past listings</Typography>
                        </div>
                    }

                    <div>
                        <FilterItems items={myPastItems} /> 
                    </div>
                    
                </div>
        

            </div>

        </div>
    )
}

export default Dashboard
