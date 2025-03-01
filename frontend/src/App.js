import { useEffect, useState, useRef } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './styles/style.css'
import actions from './api'
import TheContext from './TheContext'
import Home from './components/Home'
import Auth from './components/Auth'
import SocialFeed from './components/SocialFeed'
// import OriginalSocialFeed from './components/OriginalSocialFeed'
import TestAudio from './components/TestAudio'
import UploadFile from './components/UploadFile'
import EditProfileScreen from './components/EditProfileScreen'
import EditProfile from './components/EditProfile'
import Profile from './components/Profile'
import OtherProfile from './components/OtherProfile'
import Notification from './components/Notification'

function App() {
  const [navDisplayed, setNavDisplayed] = useState(false);
  const [user, setUser] = useState({});
  const [userViewed, setUserViewed] = useState({});
  const [toggleExplore, setToggleExplore] = useState();
  const [toggleSocial, setToggleSocial] = useState();
  const [songId, setSongId] = useState({})
  const [getSongName, setGetSongName] = useState('');
  const [songComments, setSongComments] = useState([]);

  const navRef = useRef();

  useEffect(() => {
    actions.getUser().then(res => {
      setUser(res.data)
    }).catch(console.error)
  }, [])

  const navDisplayCheck = () => {
    if (navDisplayed === true) {
      navRef.current.style.height = "0px"
      navRef.current.style.animation = 'none'
      setNavDisplayed(false)
    }
    else {
      navRef.current.style.height = "325px"
      navRef.current.style.transition = "height .5s"
      navRef.current.style.animation = "massiveMenu .8s linear forwards"
      setNavDisplayed(true)
    }
  }
  const hideNavBar = () => {
    if (navDisplayed === true) {
      navRef.current.style.height = "0px"
      navRef.current.style.animation = 'none'
      setNavDisplayed(false)
    }    
  }
  return (
    <TheContext.Provider value={{
        user, setUser, 
        userViewed, setUserViewed, 
        navDisplayed, setNavDisplayed,
        toggleSocial, setToggleSocial,
        toggleExplore, setToggleExplore,
        getSongName, setGetSongName,
        songId, setSongId,
        songComments, setSongComments
    }}>
      <div className="App">
        <nav ref={navRef}>
            <div className="menu">
              <div className="menu-route mr-1">
                <div className="menu-outset mo-1">
                  <div className="menu-inset mi-1">
                    <Link to="/" onClick={hideNavBar}>Home</Link>
                  </div>
                </div>
              </div>
              <div className="menu-route mr-2">
                <div className="menu-outset mo-2">
                  <div className="menu-inset mi-2">
                    <Link to="/auth" onClick={hideNavBar}>Log in</Link>
                  </div>
                </div>
              </div>
              <div className="menu-route mr-3">
                <div className="menu-outset mo-3">
                  <div className="menu-inset mi-3">
                    <Link to="/explore-feed" onClick={hideNavBar}>Explore</Link>
                  </div>
                </div>
              </div>
              <div className="menu-route mr-4">
                <div className="menu-outset mo-4">
                  <div className="menu-inset mi-4">
                    <Link to="/recordingBooth" onClick={hideNavBar}>Record</Link>
                  </div>
                </div>
              </div>
              <div className="menu-route mr-5">
                <div className="menu-outset mo-5">
                  <div className="menu-inset mi-5">
                    <Link to={user._id ? `/profile/${user._id}` : `/auth`} onClick={hideNavBar}>Profile</Link>
                  </div>
                </div>
              </div>
              <div className="menu-route mr-6">
                <div className="menu-outset mo-6">
                  <div className="menu-inset mi-6">
                    <Link to="/social-feed" onClick={hideNavBar}>Social</Link>
                  </div>
                </div>
              </div>
            </div>
        </nav>

        <div className="hamburger-button" onClick={navDisplayCheck}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <Notification/>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/auth" render={(props) => <Auth setUser={setUser} {...props} />} />
          <Route exact path="/profile/:id" render={(props) => <Profile user={user} {...props} />} />
          <Route exact path="/profile" render={(props) => <Profile user={user} {...props} />} />
          <Route exact path="/recordingBooth" render={(props) => <TestAudio {...props} />} />
          <Route exact path="/uploadFile" render={(props) => <UploadFile {...props} kind='song' />} />
          <Route exact path="/uploadProfilePic" render={(props) => <UploadFile {...props} kind='profilePic' />} />
          <Route exact path="/uploadBeatTrack" render={(props) => <UploadFile {...props} kind='beatTrack' />} />
          <Route exact path="/editprofile-screen" render={(props) => <EditProfileScreen {...props} />} />
          <Route exact path="/editprofile" render={(props) => <EditProfile {...props} />} />
          <Route exact path="/social-feed" render={(props) => <SocialFeed {...props} />} />
          <Route exact path="/explore-feed" render={(props) => <SocialFeed {...props} />} />
          <Route exact path="/profile/other/:id" render={(props) => <OtherProfile {...props} />} />

          {/* <Route exact path="/social-feed" render={(props) => <OriginalSocialFeed {...props} />} />
          <Route exact path="/explore-feed" render={(props) => <OriginalSocialFeed {...props} />} /> */}
        </Switch>
      </div>
    </TheContext.Provider>
  );
}

export default App;
