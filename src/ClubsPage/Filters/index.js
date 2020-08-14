import React from "react";
import "./index.css";

 import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// import 'react-accessible-accordion/dist/fancy-example.css';

import IosSearchOutline from "react-ionicons/lib/IosSearchOutline";

const CATEGORIES = [
  "Student Leadership",
  "Councils",
  "Service Clubs",
  "Fine/Performing Arts",
  "Publications",
  "Athletic Pursuits",
  "Special Interest",
  "Academic Pursuits",
  "New Initiatives",
  "Service on Saturdays"
]

const MEMBERS = [
  'Less than 10',
  '10-30', 
  '30-50',
  '50-60', 
]

const DAY = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
]

export default class Filters extends React.Component {

  state = {
    search: "",
    categories: [],
    members: [],
    days: [],
    //displayMenu: false,
    // meeting_day: "",
    // meeting_time: "",
  };

  onClickClearCategories = async () => {
    await this.setState({
      'categories': []
    });
    this.onClickSearch();
  }

  onClickHandle = async  (category, name) => {
    let list = this.state[category];
    const index = list.indexOf(name);
    if (index > -1){
      list.splice(index, 1); // remove name
    } else {
      list.push(name);
    }

    let new_state = {}; // initialize new generic state
    new_state[category] = list;
    await this.setState(new_state);
    this.onClickSearch();
  }

  onClickSearch = () => {
    let query = {}
    for (const key in this.state){
      if (this.state[key].length > 0){
        query[key] = this.state[key];
      }
    }
    this.props.onSearch(query);
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onClickSearch();
    }
  }

  render() {
    return (
      <div className="filter-box">
        <div className="search-bar">
          <input 
            placeholder="Search" 
            value={this.state.search}
            onChange={(e)=>this.setState({ search: e.target.value })}
            onKeyDown={this._handleKeyDown}
          />
          <button onClick={this.onClickSearch}>
            <p>GO</p>
            <IosSearchOutline/>
          </button>
        </div>

        <Accordion preExpanded={["category", "members", "meeting"]} allowMultipleExpanded={true} allowZeroExpanded={true}> 
          <AccordionItem uuid="category">
            <AccordionItemHeading>
              <AccordionItemButton>
              <p id="line">  </p>
                <div id="category"> 
                  <h4>TYPE</h4> 
                  <button onClick={() => this.onClickClearCategories()}>Clear</button>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>  
              <div className="categories">
                {
                  CATEGORIES.map((cat, idx) => (
                    <Checkbox 
                      key={`categories_checkbox_${idx}`}
                      name={cat} 
                      state={this.state.categories.includes(cat)} 
                      onClick={() => this.onClickHandle('categories', cat)}/>
                  ))
                }
              </div>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="members">
            <AccordionItemHeading> 
              <AccordionItemButton> 
              <p id="line">  </p>
              <div id="size"> 
              < h4>SIZE</h4>
              </div> 
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="members">
                {
                  MEMBERS.map((member, idx) => (
                    <Checkbox 
                      key={`member_checkbox_${idx}`}
                      name={member} 
                      state={this.state.members.includes(member)} 
                      onClick={() => this.onClickHandle('members', member)}/>
                  ))
                }
              </div>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem uuid="meeting"> 
            <AccordionItemHeading>
              <AccordionItemButton> 
              <p id="line">  </p>
              <div id="meeting"> 
                <h4>MEETING</h4>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel> 
              <div className="meeting">
                {
                  DAY.map((day, idx) => (
                    <Checkbox 
                      key={`meeting_day_checkbox_${idx}`}
                      name={day} 
                      state={this.state.days.includes(day)} 
                      onClick={() => this.onClickHandle('days', day)}/>
                  ))
                }
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion> 
      </div>
    )
  }
}

const Checkbox = ({ name, state, onClick }) => (
  <div className="checkbox">
    <input
      name={name}
      type="checkbox"
      checked={state}
      onChange={onClick} />
    <p onClick={onClick}>{name}</p>
  </div>
)