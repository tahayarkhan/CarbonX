import React from 'react'
import profile from "../assets/profile/profile.png";
import  leaf  from '/leaf.png';

const Navbar = () => {
  return (
    
    
    <nav 
        class="navbar navbar-expand-lg navbar-light"
        style={{ 
            backgroundColor: '#000000',
            position: 'fixed', 
            top: 0,
            left: 0, 
            width: '100%',

          }}
    >

        <a 
            class="navbar-brand" 
            href="#" 
            style={{ 
                marginLeft: '20px',
                fontWeight: 'bold', 
                color: '#FFFFFF',
            }}

        >
            Carbon 
            <img src={leaf} style={{ width: '30px', height: '30px' }} />
        </a>

        <button 
            class="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            
        >

            <span class="navbar-toggler-icon" ></span>
        
        </button>

        <div class="collapse navbar-collapse" id="navbarNav" >
            
            <ul 
                class="navbar-nav ml-auto" 
                style={{ 
                    marginLeft: 'auto',
                    marginRight: '20px',                    
                }}
            >
                    <li class="nav-item active">
                        <a class="nav-link" href="/" style={{ marginRight: '20px', color: '#FFFFFF' }}>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/dashboard" style={{ marginRight: '20px', color: '#FFFFFF' }}>Dashboard</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/rankings" style={{ marginRight: '20px', color: '#FFFFFF' }}>Leaderboard</a>
                    </li>

                    <img
                        src={profile}
                        className="rounded-circle"
                        alt="profile"
                        style={{ width: "40px", height: "40px" }}
                    />



            </ul>

        </div>


    </nav>


  )
}

export default Navbar