import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './styles/index.scss';
import Routes from './routes';
import { UserContext } from './context/userContext';
import cookies from './helpers/cookieParser';

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      console.log('test...')
      const res = await fetch('/user', {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': cookies(),
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      const user = await res.text();

      if (user !== "anonymousUser") {
        setUser({ authenticated: user })
      }

    }

    fetchUser();
  }, [])
  const [user, setUser] = useState({ authenticated: "" });
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      {/* @ts-ignore */}
      <UserContext.Provider value={value}>
        {Routes}
      </UserContext.Provider>
    </div>
  );
}

export default App;
