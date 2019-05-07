import React, { useState, useEffect } from 'react'

import fBase from './utilities/firebase';

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState({ user: undefined });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    fBase.auth().onAuthStateChanged(auth => {
      auth && setUser({ user: auth.providerData[0] });
    })
  }, []);

  const logOut =  evt => {
    evt.preventDefault();
    fBase
      .auth()
      .signOut()
      .then(() => setUser({ user: undefined }));
  }

  const createUser = async (evt, email, password, name, history) => {
    setIsFetching(true);
    evt.preventDefault();
    await fBase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = fBase.auth().currentUser;

        currentUser && currentUser.updateProfile({
          displayName: name
        })
        .then(() => {
          setUser({ user: {
            displayName: currentUser.displayName,
            email: currentUser.email,
            providerId: currentUser.providerId,
            uid: currentUser.uid
          }});
          history.push("/")
        });
      })
      .catch(error => setError(error.message))
      .finally(() => setIsFetching(false));
  }

  const logIn = async (evt, email, password, history) => {
    setIsFetching(true);
    evt.preventDefault();
    await fBase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch(error => setError(error.message))
      .finally(() => setIsFetching(false));
  }

  return (
    <UserContext.Provider value={{
      user,
      logOut,
      createUser,
      isFetching,
      error,
      setError,
      logIn
    }}>
      { props.children }
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
