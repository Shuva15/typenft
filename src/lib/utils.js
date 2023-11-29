import { useEffect, useState } from 'react';
import { currentUser } from '@onflow/fcl';
import './config'

const useCurrentUser = () => {
  const [user, setUser] = useState({
    addr: null,
    loggedIn: false,
  });

  useEffect(() => {
    currentUser.subscribe(setUser);
  }, []);

  return user;
};

export default useCurrentUser;