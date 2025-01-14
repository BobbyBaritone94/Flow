import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import actions from "../api";
import TheContext from "../TheContext"
import Comments from "./Comments"
import Search from "./Search.js"
import NavBar from "./NavBar"
import gradientbg from "../images/gradient-bg-2.png";
import play from "../images/play.svg";
import pause from "../images/pause.svg"
import gifsArr from "../images/gifs.json";

// let SONG = {};

function SocialFeed(props) {
  const { user, setUser, 
          userViewed, setUserViewed, 
          navDisplayed, setNavDisplayed,
          toggleSocial, setToggleSocial,
          toggleExplore, setToggleExplore,
          getSongName, setGetSongName,
          songId, setSongId,
          songComments, setSongComments
    } = React.useContext(
    TheContext
  );
  const location = useLocation();

  let page = 1;
  let page2 = 1
  let gifsCopy = [...gifsArr]

  const [thisFeedSongs, setThisFeedSongs] = useState([]);
  const [exploreFeedSongs, setExploreFeedSongs] = useState([])
  const [userForSong, setUserForSong] = useState({});
  const [getSongCaption, setGetSongCaption] = useState()
  const [poppedUp, setPoppedUp] = useState(false);
  const [searchPoppedUp, setSearchPoppedUp] = useState(false);
  
  const popUpSearchRef = useRef();
  const commentBtn = useRef();
  const searchBtn = useRef();
  const audioRef = useRef();
  const windowRef = useRef();
  const profilePicRef = useRef();
  const likesRef = useRef();
  const popUpRef = useRef();
  const opacityRef1 = useRef();
  const opacityRef2 = useRef();
  const dumbSearchRef = useRef();  

  useEffect(() => {
    if (location.pathname === "/explore-feed") {
      setToggleExplore(true)
      setToggleSocial(false)
    }
    if (location.pathname === "/social-feed") {
      setToggleSocial(true)
      setToggleExplore(false)
    }
  }, [location])

  const getRandomBackground = () => {
    let index = Math.floor(Math.random()*gifsCopy.length)
    return gifsCopy[index].url
  }

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((usersSongs) => {
        const songsArray = usersSongs.data.map((each) => {
          return {song: each, songVideo: getRandomBackground()}
        })
        setThisFeedSongs(songsArray);
      })
      .catch(console.error);
  }, [page]);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((exploreSongs) => {
        exploreSongs.data.reverse()
        const exploreSongsArray = exploreSongs.data.map((each) => {
          return {song: each, songVideo: getRandomBackground()}
        })
        setExploreFeedSongs(exploreSongsArray)
      })
      .catch(console.error);
  }, [page2]);

  useEffect(() => {
    if (navDisplayed == true) {
      menuDown('search')
      menuDown('comment')
    }
  }, [navDisplayed])

  const menuDown = (whichMenu) => {
    if (whichMenu == 'search') {
      searchBtn.current.style.boxShadow = "3px 3px 5px #3d3f3f, -2px -2px 3px #939597"
      popUpSearchRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";
      dumbSearchRef.current.style.opacity = 0;
      setSearchPoppedUp(false);
    }
    else if (whichMenu == 'comment') {
      commentBtn.current.style.boxShadow = "3px 3px 5px #3d3f3f, -2px -2px 3px #939597"
      popUpRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";
      opacityRef1.current.style.opacity = 0;
      opacityRef2.current.style.opacity = 0;
      setPoppedUp(false);
    }
  }
  const menuUp = (whichMenu) => {
    if (whichMenu == 'search') {
      searchBtn.current.style.boxShadow = "inset 2px 2px 3px #3d3f3f, inset -2px -2px 3px #989898"
      dumbSearchRef.current.style.opacity = 1;
      popUpSearchRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";
      setSearchPoppedUp(true);
    }
    else if (whichMenu == 'comment') {
      commentBtn.current.style.boxShadow = "inset 2px 2px 3px #3d3f3f, inset -2px -2px 3px #989898"
      opacityRef1.current.style.opacity = 1;
      opacityRef2.current.style.opacity = 1;
      popUpRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";
      setPoppedUp(true);
    }
  }

  const popUpComments = () => {
    if (poppedUp == false) {
      menuDown('search')
      menuUp('comment')
    } else {
      menuDown('comment')
    }
  };

  const popUpSearch = () => {
    if (searchPoppedUp == false) {
      menuDown('comment')
      menuUp('search')
    } else {
      menuDown('search')
    }
  };

  const transClass = () => {
    if (toggleSocial === true) {
      return "fadeRight"
    }
    else {
      return "fade"
    }
  }


  const handlePlayPause = () => {
    if (audioRef.current.paused) {
     audioRef.current.play()
    }
    else {
     audioRef.current.pause()
   }
  }

  function DisplaySong(eachSong) {
    const viewRef = useRef();
    const [inViewRef, inView] = useInView({
      threshold: 1,
      root: document.querySelector('.video-scroll-container'),
    });
  
    const setRefs = useCallback(
      (node) => {
        viewRef.current = node;
        inViewRef(node)
      },
      [inViewRef],
    )
    if (inView) {
      setUserForSong(eachSong.song.songUser)
      setSongId(eachSong.song._id)
      setGetSongName(eachSong.song.songName)
      setGetSongCaption(eachSong.song.songCaption)
      setUserViewed(eachSong.song.songUser)
      setSongComments(eachSong.song.songComments)
      console.log(eachSong)
      audioRef.current.src = eachSong.song.songURL
      likesRef.current.innerHTML = eachSong.song.songLikes.length
    }
  
    return (
      <li
        ref={setRefs}
        id={eachSong.song.songUser._id}
        className="video-pane"
        style={{ backgroundImage: `url('${gradientbg}'), url('${eachSong.songVideo}')` }}
        >
          {/* {console.log(rendersz.current++)} */}
        <div className="last-div"></div>
      </li>
    );
  }

  const showSongs = () => {
    return thisFeedSongs.map((eachSong) => {
      // eachSong.shorts = getRandomBackground();
      return <DisplaySong key={eachSong.song?._id} {...eachSong} />;
    });
  }
  const showExploreSongs = () => {
    return exploreFeedSongs.map((eachSong, index) => {
      // eachSong.shorts = getRandomBackground();
      return <DisplaySong key={eachSong.song._id + index} {...eachSong} />
    })
  }

  return (
      <div className="SocialFeed">
        <div ref={windowRef} className="social-panel">
          <div className="video-scroll-container" style={{width: '99%'}}>
              <CSSTransition
                in={toggleSocial}
                key={'key2'}
                classNames={transClass()}
                timeout={800}
                mountOnEnter
                unmountOnExit
                >
                  <ul className="video-scroll-container">
                    {showSongs()}
                  </ul>
              </CSSTransition>
              <CSSTransition 
                in={toggleExplore}
                key={'key1'}
                classNames={transClass()}
                timeout={800}
                mountOnEnter
                unmountOnExit
                >
                  <ul className="video-scroll-container">
                    {showExploreSongs()}
                  </ul>
              </CSSTransition>
          </div>

          <div className="video-details-container">
            <div className="transparent-test">
              <div className="user-details-container">
                <div className="user-details-inset">
                  <div className="text-container">
                    <div className="udt-1-container">
                      <p className="ud-text udt-1"> 
                        <span style={{ color: "#ec6aa0" }}>
                          {userForSong.userName}
                        </span>
                      </p>
                    </div>
                    <div className="udt-2-container">
                      <p className="ud-text udt-2">
                        {getSongName}
                      </p>
                    </div>
                    <div className="udt-3-container">
                      <p className="ud-text udt-3">
                        {getSongCaption ? getSongCaption : "no caption for this flow"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-profile-image">
                <div className="user-profile-inset social-p">
                  <div className="nav-buttons-inset inset-social-p">
                    <img className="button-icons bi-play" src={play} onClick={handlePlayPause}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Search popUpSearchRef={popUpSearchRef} 
                dumbSearchRef={dumbSearchRef} 
                />
        <Comments popUpRef={popUpRef} 
                  opacityRef1={opacityRef1} 
                  opacityRef2={opacityRef2}
                  />
        <NavBar popUpSearch={popUpSearch} 
                popUpComments={popUpComments} 
                searchBtn={searchBtn} 
                commentBtn={commentBtn}
                songForUserId={userForSong._id}
                songForUserProfile={userForSong}
                songForUserPic={userForSong.picture}
                profilePicRef={profilePicRef}
                likesRef={likesRef}
                />
        <audio ref={audioRef} id='damn'></audio>
      </div>
    )
  }

export default SocialFeed;
