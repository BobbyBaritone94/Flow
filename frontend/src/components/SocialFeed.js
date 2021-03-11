import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gradientbg from "../images/gradient-bg-2.png";
import play from "../images/play.svg";
import TheContext from "../TheContext";
import actions from "../api";
import mic from "../images/record2.svg";
import avatar3 from "../images/avatar3.svg";
import social from "../images/social.svg";
import follow from "../images/follow.svg";
import comments from "../images/comment.svg";
import search from "../images/search.svg";
import heart2 from "../images/heart2.svg";
import explore from "../images/explore.svg";
import Search from "../components/Search";

function SocialFeed(props) {
  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );

  // axios.get();

  const [comment, setComment] = useState();
  const [poppedUp, setPoppedUp] = useState(false);
  const [searchPoppedUp, setSearchPoppedUp] = useState(false);
  const windowRef = useRef();
  const popUpRef = useRef();

  const opacityRef1 = useRef();
  const opacityRef2 = useRef();
  const opacityRef3 = useRef();
  const popUpSearchRef = useRef();
  const opacitySearchRef3 = useRef();

  const popUpComments = () => {
    if (poppedUp == false) {
      opacityRef1.current.style.opacity = 1;
      opacityRef2.current.style.opacity = 1;
      opacityRef3.current.style.opacity = 1;
      popUpRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";

      setPoppedUp(true);
    } else {
      popUpRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";

      opacityRef1.current.style.opacity = 0;
      opacityRef2.current.style.opacity = 0;
      opacityRef3.current.style.opacity = 0;
      setPoppedUp(false);
    }
  };

  const popUpSearch = () => {
    if (searchPoppedUp == false) {
      opacitySearchRef3.current.style.opacity = 1;
      popUpSearchRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";

      setSearchPoppedUp(true);
    } else {
      popUpSearchRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";

      opacitySearchRef3.current.style.opacity = 0;
      setSearchPoppedUp(false);
    }
  };

  const [thisFeedSongs, setThisFeedSongs] = useState([]);
  let page = 1;
  let userUser = "";
  let songUsersArr = [];

  //TEMPORARY CODE TO SHOW ALL SONGS JUST TO GET SOME LIKES ADDED
  useEffect(() => {
    actions
      .getUserSongs(user)
      .then((usersSongs) => {
        setThisFeedSongs(usersSongs.data);

        console.log("inside useffect", thisFeedSongs);
        usersSongs.data.map((eachFSong) => {
          console.log("WTF", eachFSong);
          return actions
            .getAUser(eachFSong)
            .then((res) => {
              console.log("second action results", res);
              songUsersArr.push(res);
            })
            .catch(console.error);


            
        });
      })
      .catch(console.error);
  }, [page]);

  // console.log("thisFeedSongs", thisFeedSongs);
  console.log("songUsersArray", songUsersArr);

  const [userForSong, setUserForSong] = useState({});

  // const getSongUsers = (theUserId) => {
  //     console.log('HEY HEY HEY HEY HEY HEY', theUserId )
  //     actions
  //     .getAUser(theUserId)
  //     .then((useUser) => {
  //         setUserForSong(useUser.data)
  //     })
  //     .catch(console.error)
  // }

  // useEffect(() => {
  //     actions
  //     .getAUser(eachSong)
  //     .then((res) => {
  //         setUserForSong(res.data)
  //     })
  //     .catch(console.error)
  // }, [userUser]);

  const showSongs = () => {
    return thisFeedSongs.map((eachSong) => {
      // console.log("CAN THIS WORK", eachSong.songUser)
      //   userUser = eachSong.songUser

      //   console.log("userForSong", userForSong)
      return (
        <li
          className="video-pane"
          style={{
            backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/l3b01SFaxG0V0GqV6N/source.gif')`,
          }}
        >
          <div className="text-container">
            <h5 className="ud-text udt-1">
              <span style={{ color: "#ec6aa0" }}>@Usernamesernamese</span>{" "}
            </h5>
            <h6 className="ud-text udt-2">{eachSong.songName}</h6>
            <h6 className="ud-text udt-3">
              {eachSong.caption ? (
                <p>{eachSong.caption}</p>
              ) : (
                <p>NO CAPTION FOR THIS FLOW</p>
              )}
            </h6>
          </div>
        </li>
      );
    });
  };

  // REAL CODE TO REPLACE TEMPORARY GET ALL SONGS CODE ABOVE HERE
  // useEffect(() => {
  //   actions
  //     .getUserLikedSongs(user)
  //     .then((usersSongs) => {
  //       setThisFeedSongs(usersSongs.data);
  //     })
  //     .catch(console.error);
  // }, [page]);

  const getSocialFeed = () => {
    page === 1 ? (page = 0) : (page = 1);
    console.log("GET SOCIAL FEED SONGS FUNCTION");
  };

  const showNavBar = () => {
    return (
      <footer
        style={{ height: `${props.height}`, flexDirection: `${props.row}` }}
      >
        <div className="social-buttons" style={{ display: `${props.display}` }}>
          <div className="social-list">
            <div className="individual-btn">
              <div className="individual-profile-pic">
                {/* stuff it in my tiny hole! (user's profile img) */}
              </div>
            </div>
            <div className="like-comment-container">
              <div className="individual-btn">
                <img className="social-icons follow" src={follow}></img>
              </div>
              <div className="individual-btn" onClick={popUpSearch}>
                <img className="social-icons heart" src={search}></img>
              </div>
              <div className="individual-btn" onClick={popUpComments}>
                <img className="social-icons comment" src={comments}></img>
              </div>
            </div>
          </div>
        </div>
        <div
          className="nav-buttons"
          style={{ boxShadow: `${props.shadowDisplay}` }}
        >
          <div className="nav-list">
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {userViewed._id ? (
                    <Link to="/recordingBooth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons bi-record" src={mic}></img> */}
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons" src={explore}></img>
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div onClick={getSocialFeed} className="nav-buttons-inset">
                  <img className="button-icons" src={social}></img>
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {user._id ? (
                    <Link to="/profile">
                      <img className="button-icons" src={avatar3}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons" src={avatar3}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons" src={avatar3}></img> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const displaySearch = () => {
    return (
      <div ref={popUpSearchRef} className="comment-pop-out">
        <Search />

        <div
          ref={opacitySearchRef3}
          style={{ opacity: "0" }}
          className="bottom-bar"
        >
          <div className="inner-bar"></div>
        </div>
      </div>
    );
  };

  const displayComments = () => {
    return (
      <div ref={popUpRef} className="comment-pop-out">
        <div className="inner-com">
          <div
            ref={opacityRef1}
            style={{ opacity: "0" }}
            className="com-cont-1"
          >
            <div className="input-container">
              <div className="input-inset">
                <form className="social-comment-form">
                  <input
                    className="social-comment-input"
                    type="text"
                    value=""
                    placeholder="Drop yo comment"
                  ></input>
                </form>
              </div>
            </div>
          </div>

          <div
            ref={opacityRef2}
            style={{ opacity: "0" }}
            className="com-cont-2"
          >
            <div className="comments-container">
              <div className="comment-list-container">
                <div className="comment-list">
                  <div className="comment-list-inner">
                    <p className="comment-username">@username</p>
                    <p className="comment-date">12m</p>
                    <p className="comment-text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={opacityRef3} style={{ opacity: "0" }} className="bottom-bar">
          <div className="inner-bar"></div>
        </div>
      </div>
    );
  };

  // REAL CODE TO REPLACE TEMPORARY GET ALL SONGS CODE ABOVE HERE
  // useEffect(() => {
  //   actions
  //     .getUserLikedSongs(user)
  //     .then((usersSongs) => {
  //       setThisFeedSongs(usersSongs.data);
  //     })
  //     .catch(console.error);
  // }, [page]);

  return (
    <div className="SocialFeed">
      <div ref={windowRef} className="social-panel">
        <ul className="video-scroll-container">
          {showSongs()}
          {/* <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/l3b01SFaxG0V0GqV6N/source.gif')`}}>
                        <div ref={trackInfo} className="video-details-container">
                            <div className="transparent-test">
                                <div className="user-details-container">
                                    <div className="user-details-inset">

                                    </div>
                                </div>
                                <div className="user-profile-image">
                                    <div className="user-profile-inset social-p">
                                       <div className="nav-buttons-inset inset-social-p">
                                         <img className="button-icons bi-play" src={play}></img>
                                     </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li> */}
          {/* <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/RLQaZ8LeuqrTx0Eeat/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/s2fB8Mv2UYBPLC041d/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/2xDcfbqistol0Ox63h/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/13hSJauZ5CUJ0c/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/3o7btZxS1IFtwrgfQY/source.gif`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/t7QSxX3Ebs2OE9cOfG/source.gif')`}}>

                    </li> */}
          <div className="video-details-container">
            <div className="transparent-test">
              <div className="user-details-container">
                <div className="user-details-inset"></div>
              </div>

              <div className="user-profile-image">
                <div className="user-profile-inset social-p">
                  <div className="nav-buttons-inset inset-social-p">
                    <img className="button-icons bi-play" src={play}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
      {displayComments()}
      {displaySearch()}
      {showNavBar()}
    </div>
  );
}

export default SocialFeed;
