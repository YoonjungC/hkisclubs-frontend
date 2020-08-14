import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import MdPerson from "react-ionicons/lib/MdPerson";
import IosPaper from "react-ionicons/lib/IosPaper";
import IosMail from "react-ionicons/lib/IosMail";
import MdCheckmarkCircleOutline from "react-ionicons/lib/MdCheckmarkCircleOutline";
import LogoInstagram from "react-ionicons/lib/LogoInstagram";
import LogoFacebook from "react-ionicons/lib/LogoFacebook";
import IosSchool from "react-ionicons/lib/IosSchool";
import LogoTwitter from "react-ionicons/lib/LogoTwitter";
import IosGlobeOutline from "react-ionicons/lib/IosGlobeOutline";
import IosTime from "react-ionicons/lib/IosTime";
import IosCube from "react-ionicons/lib/IosCube";

import "./index.css";

const CONTACT_TYPE = {
  'instagram': LogoInstagram, //list of contact description and logo in order to map 
  'facebook': LogoFacebook,
  'twitter': LogoTwitter,
  'schoology invite': IosSchool,
  'website': IosGlobeOutline,
}

class ClubsPage extends React.Component {
  render() {
    const club = this.props.club;
    console.log(club)
    if (club.hasOwnProperty("name")) {
      return (
        <div className="modal-container">
          <button
            className="modalClose"
            onClick={this.props.closeModal}
          >
            X
          </button>
          <div className="club_title">
            <h1>{club.name}</h1>
            <button onClick={()=>this.props.onBookmark(club._id)}>
              {
                this.props.bookmarked
                ? "Unbookmark"
                : "Bookmark"
              }
            </button>
          </div>
          <div className="modal-body">
            <div className="left"> 
              <div className="description">
                <div id="text"> 
                <h3> Description </h3>
                <p>{club.description}</p>
                </div>
                <Carousel
                  className="carousel"
                  showThumbs={false}
                  emulateTouch={true}
                >
                  {
                    club.photos.length === 0 
                    ? (
                      <div>
                        <img src="https://pbs.twimg.com/profile_images/1037239550311944192/EXKhlOmQ.jpg" alt="slides" />
                      </div>
                    )
                    : (
                      club.photos.map((photo, index) => (
                        <div>
                          <img src={photo.url} alt="slides" />
                        </div>
                      ))
                    )
                  }
                  
                </Carousel>
              </div>
            
              {/* width 70%, flex-direction: column */}
              {/* description */}
              {/* profiles */}
            </div>
            <div className="right"> 
              <div className="basicInfo">
                <h3> <span> </span>  Basic Info </h3>
                <div className="leader">
                <p> <MdPerson color="#bfbdbd"/> 
                 {club.members}</p>
                </div>
                <div className="category">
                <p> <IosCube color="#bfbdbd"/> 
                 {club.category}</p>
                </div>
                <div className="meeting">
                <p> <IosTime color="#bfbdbd"/> 
                {
                  club.meeting && club.meeting.length !== 0 
                  ? <span>{club.meeting[0].day} at {club.meeting[0].time}</span>
                  : null
                }
                </p>
                </div>
                {
                  club.zoom && club.zoom.length === 0 // checking the lenght for empty string
                  ? null 
                  : (
                    <div id="zoom">
                      <h3>Club Meeting Zoom Link</h3> 
                      <p id="zoomLink"> 
                        <IosSchool color="#bfbdbd"/>
                        <a href={club.zoom}>Zoom Link</a>
                      </p>
                    </div>
                  )
                }
                {
                  club.application 
                  ? (
                  <div>
                    <p> <IosPaper color="#bfbdbd"/> 
                   Application Required for All Roles</p>
                  </div>
                  ) : null
                }
                {
                  club.contact.length === 0 // checking the lenght for empty array
                  ? null 
                  : (
                    <div id="contact">
                      <h3> Contact </h3> 
                      {
                        club.contact.map((contact) => (
                          <div id="contactLinks"> 
                            <a href={contact.url}> {React.createElement(CONTACT_TYPE[contact.description], {color: '#bfbdbd'})} </a>
                            <a id="link" href={contact.url} target="_blank"> {contact.description} </a>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div>
                </div>
              </div>
              <div id="leadersIcons">
              <h3> Leaders </h3>
                  {club.leaders.map((profile, index) => (
                    <div id="profile-section">
                      <img src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png" alt="" /> 
                      <div id="profileName"> 
                        <p>{profile.name}</p>
                      </div> 
                      <div id="email"> 
                        <p> {profile.email} </p>
                      </div> 
                    </div>
                  ))}              
              </div>
              {
                club.experience.length === 0 
                ? null
                : (
                  <div className="memberExperience">
                    <h3> Member Experiences </h3>
                    {
                      club.experience.map((experience)=> 
                        <p> {experience.author}: {experience.description} </p>
                      )
                    }
                  </div>
                )
              }
            </div>
          
          </div>
        {/* <div className="modal-body">
          <div className="modal-description">
            

            <div className="details">
              
              

              
            </div>
          </div>
        </div>
        <div className="modal-body-2">
          <div className="events">
            <h3> Events! </h3>
            <p> {club.events} </p>
          </div>
        </div> */}
      </div>
      );
    } else {
        return (
            <div>Error, no modal found</div>
        )
    }
  }
}

export default ClubsPage;
