import React from 'react';
import "./index.css"; 

import IosBookmarkOutline from 'react-ionicons/lib/IosBookmarkOutline';
import IosBookmark from 'react-ionicons/lib/IosBookmark';

const Card = (props) => (
    <div className="wrapper">
        <div className="bookmarkingContainer" >
            { 
                props.bookmarked
                    ? <IosBookmark color="#414141" className="icon"/> 
                    : <IosBookmarkOutline className="icon"/> 
            }
        </div>
        
        <div className="container" onClick={()=>props.selectClub(props.club)}>
            <div className="top"> 
                {/* {
                    club.photos.length === 0 
                        ? (
                        <div>
                            <img src="https://pbs.twimg.com/profile_images/1037239550311944192/EXKhlOmQ.jpg" alt="slides" />
                        </div>
                        )
                        : (
                        club.photos.splice(1).map((photo, index) => (
                            <div>
                            <img src={photo.url} alt="slides" />
                            </div>
                        ))
                        )
                    } */}
        
                <p id="title"> { props.club.name.toUpperCase() } </p>                      
            </div> 
            
            <div className="subtitle">
                <img alt="" src={
                    props.club.photos.length === 0
                    ? "https://pbs.twimg.com/profile_images/1037239550311944192/EXKhlOmQ.jpg"
                    : props.club.photos[0].url
                }/>
                <p> {props.club.description} </p>
            </div>
        </div> 
    </div>
)

export default Card;