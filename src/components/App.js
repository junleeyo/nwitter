import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);  
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        //setUserObj(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,          
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj({
      uid: authService.currentUser.uid,
      displayName: authService.currentUser.displayName
    })
  }

  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "Initializing...." }
      <footer>&copy; { new Date().getFullYear() } Nwitter</footer>
    </>
  );
}

export default App;
