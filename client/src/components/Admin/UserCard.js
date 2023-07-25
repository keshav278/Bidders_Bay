import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Header from '../Typography/Header'
import {Rating} from '@mui/material';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';

// In accordance with the items styling for the cards
export default function UserCard(props) {
  return (
    <Box sx={{ minWidth: 275}}>
      <Card variant="contained" style={{backgroundColor:'#00203FFF',color:'white'}}>
        
        <React.Fragment>
            <CardContent>

            <Typography style={{fontFamily:'Roboto Slab'}} variant="h5" component="div">
            {props.userinfo.name} {props.userinfo.surname} 
            </Typography>
            <Typography sx={{color:'white',fontFamily:'Roboto Slab',mb: 1.5 }} color="text.secondary" component="div">
            {props.userinfo.email}
            </Typography>
            <Typography variant="body2" component="div">

                <Header text={ <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            flexWrap: 'wrap',
                            fontFamily:'Roboto Slab'
                            }}>
                        <PointOfSaleSharpIcon />
                        { props.userinfo.saleCount ? 
                        (   <>&nbsp;{props.userinfo.sellerRating}&nbsp;
                            <Rating name="read-only" value= {props.userinfo.sellerRating/props.userinfo.saleCount } readOnly precision={0.5}/>
                            </>
                        )
                        :
                        (   <>&nbsp;No Sales Yet
                            </>
                        )
                        } 
                        </div>} 
                    />

                    <Header text={ <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            flexWrap: 'wrap',
                            fontFamily:'Roboto Slab'
                            }}>
                        <ShoppingBagSharpIcon />
                        { props.userinfo.buyCount ? 
                        (<>
                        &nbsp;{props.userinfo.bidderRating}&nbsp;
                        <Rating name="read-only" value={props.userinfo.bidderRating/props.userinfo.buyCount } readOnly precision={0.5}/>
                        </>)
                        :
                        (<>
                        &nbsp;No Purchases Yet
                        </>
                        )
                        }
                        </div>} 
                    />

            </Typography>
            </CardContent>
        </React.Fragment>
      
     
      </Card>
    </Box>
  );
}
