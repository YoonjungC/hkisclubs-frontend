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
import MdChatboxes from "react-ionicons/lib/MdChatboxes";
import MdCalendar from "react-ionicons/lib/MdCalendar";

import "./index.css";

const CONTACT_TYPE = {
  'instagram': LogoInstagram, //list of contact description and logo in order to map 
  'facebook': LogoFacebook,
  'twitter': LogoTwitter,
  'schoology invite': IosSchool,
  'website': IosGlobeOutline,
  'discord': MdChatboxes
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
              
              {
                  club.events && club.events.length > 0
                  ? (
                    <div id="events"> 
                      <h3> Major {club.name} Events </h3>
                      <p>{club.events}</p>
                    </div>
                  )
                  : null
                }
              
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
                  <p> 
                  {
                    club.meeting
                    ? (
                      // <h1> {club.meeting.length} </h1>
                      <div>
                        <h3> Meeting Times </h3>
                        <ul style={{listStyle: "none", paddingLeft: 0, display: "inline"}}>
                          {club.meeting.map((meeting) =>
                            <li>
                              <IosTime color="#bfbdbd" /> {meeting.day} at {meeting.time}
                            </li>
                          )}
                        </ul>
                      </div>
                    ) 
                    : null
                  }
                  </p>
                </div>
                {
                  club.frequency ? (
                    <div id="frequency">
                      <h3> Frequency of Meetings </h3> 
                      <p> <MdCalendar color="#bfbdbd"/> 
                          {club.frequency}
                      </p>
                    </div>
                  ): null
                }
                {
                  club.zoom===undefined || club.zoom===null || club.zoom.length === 0 // checking the lenght for empty string
                  ? null 
                  : (
                    <div id="zoom">
                      <h3>Virtual Club Marketplace Zoom Link</h3> 
                      <p id="zoomLink"> 
                        <IosSchool color="#bfbdbd"/>
                        <a href={club.zoom && club.zoom.includes("https") ? club.zoom : "https://" + club.zoom} target="_blank">Zoom Link</a>
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
                          // TODO: remove add-hoc solution - check if they are null, then remove it 
                          //throw error if leader create contact link without description 
                          //issue: leader creates contact without description/url 
                          contact !== null && contact.hasOwnProperty("url") && contact.hasOwnProperty("description")?
                            (
                              <div id="contactLinks"> 
                                <a href={contact.url.includes("https") ? contact.url : "https://" + contact.url} target="_blank"> {React.createElement(CONTACT_TYPE[contact.description], {color: '#bfbdbd'})} </a>
                                <a id="link" href={contact.url.includes("https") ? contact.url : "https://" + contact.url} target="_blank"> {contact.description} </a>
                              </div>
                            ) : null
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
