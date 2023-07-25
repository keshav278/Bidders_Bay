import React, { useContext } from 'react'
import { Link} from 'react-router-dom';
import {AuthContext } from './AuthContext'
import Logout from './Login/Logout';



// The navigatior bar
function Navbar(props) {
  
  const {authState} = useContext(AuthContext);
  
 

  return (
    <div style={{fontFamily:'Roboto Slab'}}>

      <div className="navbar">
           <div style={{padding:'20px'}}></div> 
           <h1 style={{fontFamily:'Roboto Slab'}}>Bidders Bay</h1> 
        {!authState.status ? (<> 
          
          {props.clicked==="home" ?
              <Link style={{color: 'lightblue' }} to="/">Home</Link>
              :
              <Link style={{ color: 'white' }} to="/">Home</Link>
            }
          {props.clicked==="login" ?
              <Link style={{ color: 'lightblue' }} to="/login">Login/Register</Link>
              :
              <Link style={{ color: 'white' }} to="/login">Login/Register</Link>
            }
          {props.clicked==="auctions" ?
              <Link style={{ color: 'lightblue' }} to="/auctions">Auctions</Link>
              :
              <Link style={{ color: 'white' }} to="/auctions">Auctions</Link>
            }
          {props.clicked==="search" ?
              <Link style={{ color: 'lightblue' }} to="/search">Search&nbsp;&nbsp;&nbsp;</Link>
              :
              <Link style={{ color: 'white' }} to="/search">Search&nbsp;&nbsp;&nbsp;</Link>
            }
        </>)
        :
          (<>
        
          {/* Admin won't be able to post an item, but to modify the users */}
          { ! (authState.username==="admin") ? (<> 
            {props.clicked==="home" ?
              <Link style={{ color: 'lightblue' }} to="/">Home</Link>
              :
              <Link style={{ color: 'white' }} to="/">Home</Link>
            }

            {props.clicked==="createitem" ?
              <Link style={{ color: 'lightblue' }} to="/createitem">Create</Link>
              :
              <Link style={{ color: 'white' }} to="/createitem">Create</Link>
            }

          </>)
          :
          (<> 
            {props.clicked==="users" ?
              <Link style={{ color: 'lightblue' }} to="/users">Users</Link>
              :
              <Link style={{ color: 'white' }} to="/users">Users</Link>
            }
            {props.clicked==="addcategory" ?
              <Link style={{ color: 'lightblue' }} to="/addcategory">Categories</Link>
              :
              <Link style={{ color: 'white' }} to="/addcategory">Categories</Link>
            }
            {props.clicked==="export" ?
              <Link style={{ color: 'lightblue' }} to="/export">Export</Link>
              :
              <Link style={{ color: 'white' }} to="/export">Export</Link>
            }
            </>)
          }
          
          {props.clicked==="auctions" ?
              <Link style={{ color:'lightblue' }} to="/auctions">Auctions</Link>
              :
              <Link style={{ color: 'white' }} to="/auctions">Auctions</Link>
            }
          {props.clicked==="search" ?
              <Link style={{ color: 'lightblue'}} to="/search">Search&nbsp;&nbsp;&nbsp;</Link>
              :
              <Link style={{ color: 'white' }} to="/search">Search&nbsp;&nbsp;&nbsp;</Link>
            }
          <div className ="loggedInContainer"> 
              
            <div className ="h1" style={{ color: 'white' }}>&nbsp;Signed in as {authState.username} </div>
            <Logout />
          </div>
          </>)
        }   
            
      </div>
    </div>
  )
}

export default Navbar
