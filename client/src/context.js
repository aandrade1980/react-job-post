import React, { useState, useEffect } from 'react';

import { auth, googleProvider, githubProvider } from './utilities/firebase';
import { GOOGLE_PROVIDER } from './utilities/constants';

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState({ user: undefined });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);
  const [openModal, setOpenModal] = useState({ show: false, form: undefined });

  useEffect(() => {
    auth.onAuthStateChanged(auth => {
      auth && setUser({ user: auth.providerData[0] });
    })
  }, []);

  useEffect(() => {
    const setFromEvent = evt => {
      console.log('evt target => ', evt.target);
      console.log('evt className => ', evt.target.className);
      console.log('evt classList => ', evt.target.classList);

      evt.target.classList.contains('modal-container') && setOpenModal({ ...openModal, show: false });
    };

    window.addEventListener('click', setFromEvent);  
      
    return () => window.removeEventListener('click', setFromEvent);

  }, [openModal]);

  const logOut = (evt, history) => {
    evt.preventDefault();
    auth.signOut()
      .then(() => {
        setUser({ user: undefined });
        history.push("/");
      })
      .finally(() => setOpenModal({ ...openModal, show: false }))
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

  const providerSignIn = async (provider, history) => {
    auth.useDeviceLanguage();
    await auth.signInWithPopup(provider === GOOGLE_PROVIDER ? googleProvider : githubProvider)
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
