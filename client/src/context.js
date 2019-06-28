import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { auth, googleProvider, githubProvider } from './utilities/firebase';
import { GOOGLE_PROVIDER } from './utilities/constants';

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);
  const [openModal, setOpenModal] = useState({ show: false, form: undefined });

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    auth.onAuthStateChanged(auth => {
      if (auth) {
        setUser(auth.providerData[0]);
        return <Redirect to='/' />
      }
    })
  }, []);

  useEffect(() => {
    const setFromEvent = evt => evt.target.classList.contains('modal-container') && setOpenModal({ ...openModal, show: false });

    window.addEventListener('click', setFromEvent);  
      
    return () => window.removeEventListener('click', setFromEvent);

  }, [openModal]);

  const logOut = evt => {
    evt.preventDefault();
    auth.signOut()
      .then(() => setUser(undefined))
      .finally(() => setOpenModal({ ...openModal, show: false }));
  }

  const createUser = async (evt, email, password, name) => {
    setIsFetching(true);
    evt.preventDefault();
    await auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = auth.currentUser;

        currentUser && currentUser.updateProfile({
          displayName: name
        })
        .then(() => setUser({
          ...currentUser
          }));
      })
      .catch(error => setError(error.message))
      .finally(() => setIsFetching(false));
  }

  const logIn = async (evt, email, password) => {
    evt.preventDefault();
    setIsFetching(true);
    await auth.signInWithEmailAndPassword(email, password)
      .catch(error => setError(error.message))
      .finally(() => setIsFetching(false));
  }

  const providerSignIn = async (evt, provider) => {
    evt.preventDefault();
    auth.useDeviceLanguage();
    const providerMethod = provider === GOOGLE_PROVIDER ? googleProvider : githubProvider;
    try {
      await (isMobile ?
        auth.signInWithRedirect(providerMethod) :
        auth.signInWithPopup(providerMethod));
    } catch(err) { 
      setError(err.message) 
    }
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
      providerSignIn,
      openModal,
      setOpenModal
    }}>
      { props.children }
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
