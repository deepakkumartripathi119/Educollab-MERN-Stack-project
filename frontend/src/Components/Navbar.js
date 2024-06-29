import React, { useState } from "react";
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";
import SearchCard from './SearchCard';
import ProfileCard from '../Components/ProfileCard';
import mySVGURL from '../Assets/userDummy.svg';
import searchSVGURL from '../Assets/search.svg';
import FilledStarIcon from '../Assets/heart.svg';

function Navbar() {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const handleSearchIconClick = () => {
  //   setIsSearchOpen(prevState => !prevState);
  // };
const items=["Hello","Hello","Hello","Hello","Hello","Hello"];
const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <>
    {/* {isSearchOpen && 
    <div className="SearchCardOnClick"><SearchCard/></div>
    } */}

    {/* {(!isSearchOpen) && */}
    <nav className="navbar">
      <div className="ellipse-container">
        <div className="ellipse"></div>
        <div className="home-name-container">
          <div className="home-name">EduCollab</div>
        </div>
      </div>
      
      <div className="navbar-links">
        <div>
          <Link to="/dashboard">PROJECTS</Link>
        </div>
        <div>
          <Link to={`/chatroom`}>COLLABS</Link>
        </div>
        <div>
          <Link to="/course">COURSES</Link>
        </div>
        <div>
          <Link to="/doubts">DOUBTS</Link>
        </div>
      </div>
      <div className="search-and-profile">
        {/* <div className="search-button">
          <Popup trigger=
            {<div className="navbar-right-circle"><img src={searchSVGURL} alt="My SVG" className="navbar-right-circle-img" /></div>}
            modal nested>
            {
              close => (
                <div className='modal'>
                  <div className='content'>
                    <SearchCard/>
                  </div>
                </div>
              )
            }
          </Popup>
        </div> */}

        <div className="profile-button">
          <Popup trigger=
            {<div className="navbar-right-circle"><img src={mySVGURL} alt="My SVG" className="navbar-right-circle-img"/></div>}
            modal nested>
            {
              close => (
                <div className='modal'>
                  <div className='content'>
                    <ProfileCard/>
                  </div>
                </div>
              )
            }
          </Popup>
        </div>
      </div>
    </nav>
    {/* } */}
    
    </>
  );
}
function Content({job}){
  return (
    <div className='job-div'>
      <div className='navbar_job'>
        <div className='job-title'>{job}</div>
      </div>
    </div>
  )
}
export default Navbar;




 