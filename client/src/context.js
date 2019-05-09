import React, { useState, useEffect } from 'react'

import { auth, provider } from './utilities/firebase';

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState({ user: undefined });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(auth => {
      auth && setUser({ user: auth.providerData[0] });
    })
  }, []);

  const logOut = (evt, history) => {
    evt.preventDefault();
    auth.signOut()
      .then(() => {
        setUser({ user: undefined });
        history.push("/");
      })
  }

  const createUser = async (evt, email, password, name, history) => {
    setIsFetching(true);
    evt.preventDefault();
    await auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth.currentUser;

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
    await auth.signInWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch(error => setError(error.message))
      .finally(() => setIsFetching(false));
  }

  const googleSignIn = async history => {
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.useDeviceLanguage();
    await auth.signInWithPopup(provider)
      .then(() => history.push("/"))
      .catch(error => setError(error.message));
  }

  return (
    <UserContext.Provider value={{
      user,
      logOut,
      createUser,
      isFetching,
      error,
      setError,
      logIn,
      googleSignIn
    }}>
      { props.children }
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
