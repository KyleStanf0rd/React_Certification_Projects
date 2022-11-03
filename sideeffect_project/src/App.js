import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  useEffect(() => {    
    const storedUserInfo = localStorage.getItem('isLoggedIn')

    if(storedUserInfo === 'LOGGED_IN'){
      setIsLoggedIn(true)
    }
  }, [])



  const loginHandler = (email, password) => {
    //setting localstorage to hold data
    localStorage.setItem('isLoggedIn', 'LOGGED_IN')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{isLoggedIn:false,}}>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
