import React from 'react';
export default function Header(props){
    return( 
        <header>
            <figure className="wu">
                <img src="./images/weatherLogo.png" alt="weather"></img>
            </figure>
               <h1>My Weather Channel</h1>
               <h2>JSON data from the Weather Underground</h2>
        </header>
    );
}