import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import actions from "../api";
import TheContext from "../TheContext";
import mic from '../images/record2.svg'
import avatar3 from '../images/avatar3.svg'
import social from '../images/social.svg'
import editicon from '../images/edit.svg'
import logouticon from '../images/logout.svg'
import explore from '../images/explore.svg'
import play from '../images/play.svg'


function Profile(props) {
  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );
  const [thisUser, setThisUser] = useState([userViewed]);
  const profileRim = useRef();
  const profileOut = useRef();
  const profileIn = useRef();
  const profileIcon = useRef();


  useEffect(() => {
    profileRim.current.style.animation = "rim .5s linear forwards"
    profileOut.current.style.animation = "out .5s linear forwards"
    profileIn.current.style.animation = "in .5s linear forwards"
    profileIcon.current.style.animation = "iconScale .5s linear forwards"
  }, [])

  useEffect(() => {
      actions
        .getOneUser()
        .then((thisUserDbData) => {
          setThisUser(thisUserDbData.data);
        })
        .catch(console.error);
    
  }, []);

  const logout = () => {
    setUser({});
    setThisUser({});
    setUserViewed({});
    localStorage.clear();
  };

  const [thisUserSongs, setThisUserSongs] = useState([]);

  useEffect(() => {
    console.log("profile.js line 53 ", user);
    actions
      .getUserSongs(user)
      .then((usersSongs) => {
        setThisUserSongs(usersSongs.data);
      })
      .catch(console.error);
  }, []);
  
  const showLyrics = (lyrics) => {
    return lyrics.map((eachLine, index) => {
      return (
        <p key={`${eachLine}_${index}`}>{eachLine}</p>
      )
    })
  }
  const handlePlayPause=(x)=>{
    const currentPlayer=document.getElementById(`${x}`)
    if(currentPlayer.paused){
     currentPlayer.play()
 
    }else
    {
    currentPlayer.pause()
   }
  }


  const showSongs = () => {
    return thisUserSongs.map((eachSong, index) => {
      return (
      <li key={`${eachSong._id}_${index}`} className="your-track-container">
        <div className="lyrics-play">
          <audio id={eachSong.songName} src={eachSong.songURL}></audio>
          <div className="lyrics-songname-cont">
            <h4>{eachSong.songName}</h4>
          </div>
          <div className="lyrics-outter-container">
            <div className="nav-buttons-inset play-ur-song">
              <img className="button-icons bi-play-2" src={play} onClick={()=>handlePlayPause(eachSong.songName)}></img>
            </div>
          </div>
        </div>

        <div className="lyrics-container">
          <div className="para-container">
            {showLyrics(eachSong.songLyricsStr)}
          </div>
        </div>
      </li>
      )
    })
  }

  

  return (
    <div className="Profile">
      <header className="profile-header">

        <div className="upper-filler">
          <div className="inner-filler"></div>
        </div>

        <div className="username-pic-container">

          <div className="username-pic-outset">
            <div className="profile-pic-container">
              <div className="profile-pic-outset">
                <div className="profile-pic-inset">
                  <img className="profile-pic" src={thisUser?.picture} alt="prof pic"/>
                </div>
              </div>
            </div>

            <div className="username-container">
              <div className="username-outset">
                <div className="username-inset">
                  <h3 className="username-text-me">{thisUser.userName}</h3>
                  <h3 className="username-follow-me">{thisUser.userFollows?.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bio">

          <div className="users-details-container">
            <div className="users-details-outset">
              <div className="users-details-inset">

                <div className="users-details-each ude-1">
                  <p className="little-p"><span style={{color: 'white', fontWeight: 'bold'}}>About: </span></p>
                  <p className="big-p">{thisUser.userAbout}</p>
                </div>

                <div className="users-details-each ude-2">
                  <p><span style={{color: 'white', fontWeight: 'bold'}}>Instagram: </span> {thisUser.userInstagram}</p>
                </div>

                <div className="users-details-each ude-3">
                  <p><span style={{color: 'white', fontWeight: 'bold'}}>Twitter: </span> {thisUser.userTwitter}</p>
                </div>

                <div className="users-details-each ude-4">
                  <p><span style={{color: 'white', fontWeight: 'bold'}}>SoundCloud: </span> {thisUser.userSoundCloud}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-logout-container">
            
            <div className="edit-profile-container">
              <div className="edit-profile-outset">
                <div className="edit-profile-inset">
                  <div className="edit-profile-button">
                    <Link to="/editprofile-screen" className="profile-link">
                      <img className="button-icons edit" src={editicon} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="log-profile-container">
              <div className="log-profile-outset">
                <div className="log-profile-inset">
                  <div className="edit-profile-button" onClick={logout}>
                    <img className="button-icons logout" src={logouticon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      <div className="profile-post-feed">
        <div className="profile-post-inner">
          <div className="profile-post-inner-inner">
            <ul className="profile-post-innerest">
              {showSongs()}
            </ul>
          </div>
        </div>
      </div>

      <div className="nav-buttons nb-profile" style={{boxShadow: `${props.shadowDisplay}`}}>
        <div className="nav-list">

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <Link to={userViewed._id ? ("/recordingBooth") : ("/auth")}>
                <img className="button-icons bi-record" src={mic}></img>
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <Link to="/explore-feed">
                <img className="button-icons bi-explore-p" src={explore} alt="explore"></img>
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <Link to={user._id ? ("/social-feed") : ("/auth")}>
                <img className="button-icons bi-social-p" src={social}></img>
              </Link>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim" ref={profileRim}>
          <div className="nav-buttons-outset" ref={profileOut}>
            <div className="nav-buttons-inset" ref={profileIn}>
              <img className="button-icons bi-profile-p" src={avatar3} ref={profileIcon}></img>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
