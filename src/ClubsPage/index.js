import React from "react";
import Modal from "react-modal";
import InfiniteScroll from 'react-infinite-scroll-component';
import IosDownloadOutline from "react-ionicons/lib/IosDownloadOutline";

import "./index.css";

import Card from "../Cards/index.js";
import ModalContent from "./Modal";
import Filters from "./Filters";
import { API_URL, FRONTEND_URL } from "../constants/api";

class ClubsPage extends React.Component {
  state = {
    clubs: [],
    modalOpen: false,
    selectedClub: {},
    bookmarked: [],

    saved: false,
    load: true,
    members: [],

    page: 1,
    totalClubs: 0,
    
    query: {},

    items: Array.from({ length: 20 }),
    hasMore: true
  };

  componentDidMount() {
    // get list of clubs, assume already authenticated
    fetch(`${API_URL}/club?items=10`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        window.open(`${FRONTEND_URL}/login`, "_self");
      }

      // if success, the user is authenticated and has bookmarks
      let bookmarked = this.props.auth.user.saved || [];
      // console.log('on component mount', data.count)

      this.setState({
        clubs: data.clubs,
        totalClubs: data.count,
        load: false,
        bookmarked,
      })
    })
  }

  fetch_url = () => {
    let url = `${API_URL}/club?page=${this.state.page}&items=30`;
    const query = this.state.query;
    if (Object.keys(query).length > 0){
      for (const key in query) {
        if (query[key].length > 0) {
          let value = typeof query[key] === 'string' ? query[key] : JSON.stringify(query[key]);
          url += `&${key}=${value}`;
        }
      }
    }
    console.log('fetch url', url);
    return url;
  }

  // INFINITE SCROLL - START

  getClubs = () => {
    console.log('getting new club')

    const url = this.fetch_url();
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => response.json())
    .then(async data => {
      if (data.error) {
        console.error('there was an error fetching clubs', data.message);
        window.open(`${FRONTEND_URL}/login`, "_self");
      }

      let clubs = this.state.clubs.concat(data.clubs);
      console.log(data.clubs.length, clubs.length)
      console.log('number of clubs', data.count)
      console.log(clubs.length < data.count)

      await this.setState({
        clubs,
        totalClubs: data.count,
        page: this.state.page + 1,
        load: false,
      })
    })
  }

  // INFINITE SCROLL - END

  // CLICK HANDLERS

  selectClub = (club) => {
    this.setState({
      selectedClub: club,
      modalOpen: true,
    });
  };

  onSearch = async (query) => {
    await this.setState({
      clubs: [],
      load: true,
      query,
      page: 0
    });

    this.getClubs();
  }

  // updates saved array and puts it into bookmarked state
  onBookmark = (clubId) => {
    fetch(`${API_URL}/club/bookmark/${clubId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.props.updateBookmarks(data.user.saved); //updates parent component by using updateBookmarked in App.js
        this.setState({ 
          bookmarked: data.user.saved, //updates this current component which is clubs page
        })
      }
      // catch error
    })
  }

  onClickSaved = async () => {
    await this.setState({
      saved: !this.state.saved
    })

    if (this.state.saved) {
      fetch(`${API_URL}/club/saved`, {
        method: "GET",
        credentials: "include", //cookie
        headers: {
          "Access-Control-Allow-Credentials": true
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success){
          this.setState({
            clubs: data.clubs,
            totalClubs: data.clubs.length
          })
        }
      })
    } else {
      await this.setState({
        clubs: [],
        page: 0,
        query: {},
        load: true,
      });
      this.getClubs();
    }
  }

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

  render() {
    return (
      <div className="clubs_page"> 
        <div className="main_div">
          <div className="page_title">
            <div className="toprow"> 
              <h1>Browse Through Clubs</h1>
              <button 
                className={this.state.saved ? "saved clicked" : "saved"} 
                onClick={() => this.onClickSaved()}> 
                <IosDownloadOutline size ="100%" color="#7a7a7a"/>
                <p>Saved</p>
              </button>
            </div>
            <h3>Find Your People!</h3>
          </div>
          <div className="display">
            {
              this.state.saved 
                ? (
                  <div className="filter-box">
                    <h3> Here are your saved Clubs </h3>
                    <div> 
                      <div className="boxes">
                      <div id="first">
                        <h4> 1. Once you click on a club, click on the “bookmark” button which is on the top of the club </h4>
                      </div>
                      <div  id="second">
                        <h4> 2. The club will get added to your saved clubs </h4>
                      </div>
                      <div id="third">
                        <h4> 3. You've ceated your personalized collection of clubs which you can come back to later! </h4>
                      </div>
                    </div>
                    </div>
                  </div> 
                )
                : <Filters onSearch={this.onSearch}/>
            }
            {
              !this.state.load && this.state.clubs.length > 0
                ? (
                  // <InfiniteScroll
                  //   dataLength={this.state.items.length}
                  //   next={this.fetchMoreData}
                  //   hasMore={this.state.hasMore}
                  //   loader={<h4>Loading...</h4>}
                  //   endMessage={
                  //     <p style={{ textAlign: "center" }}>
                  //       <b>Yay! You have seen it all</b>
                  //     </p>
                  //   }
                  // >
                  //   {this.state.items.map((i, index) => (
                  //     <div key={index}>
                  //       div - #{index}
                  //     </div>
                  //   ))}
                  // </InfiniteScroll>
                  <InfiniteScroll
                    dataLength={this.state.clubs.length} //This is important field to render the next data
                    next={this.getClubs}
                    hasMore={this.state.clubs.length < this.state.totalClubs}
                    loader={<h4> Keep scrolling down to load more clubs </h4>}
                    endMessage={
                      <p style={{textAlign: 'center'}}>
                        <b> </b>
                      </p>
                    }>
                      <div className="allClubs_container">
                        {this.state.clubs.map((club, index) => (
                          <Card
                            key={`club_card_${index}`}
                            club={club}
                            selectClub={this.selectClub}
                            bookmarked={this.state.bookmarked.includes(club._id)}
                          />
                        ))}
                      </div>
                  </InfiniteScroll>
                ) 
              : (
                this.state.load ? 
                <p id="noclubs"> Loading... </p> : 
                <div id="noclubs"> <p> Sorry! No clubs found. </p> </div>
              )
            }
          </div>
        </div>
        <Modal isOpen={this.state.modalOpen} contentLabel="Club Details">
          <ModalContent 
            club={this.state.selectedClub} 
            closeModal={()=>this.setState({ modalOpen: false })}
            bookmarked={this.state.selectedClub ? this.state.bookmarked.includes(this.state.selectedClub._id): false}
            onBookmark={this.onBookmark}
          /> 
        </Modal>
      </div>
    );
  }
}

export default ClubsPage;
