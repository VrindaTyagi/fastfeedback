import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
import firebase from "./firebase";

const authContext = createContext();

export function AuthProvider ({ children }) {
	const auth = useProviderAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

function useProviderAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true)
	//console.log("user", user);
	const handleUser = (rawUser) => {
		if (rawUser) {
		  const user = formatUser(rawUser)

		  createUser(user.uid, user);
		//   setLoading(false)
		  setUser(user)
		  return user
		} else {
		//   setLoading(false)
		  setUser(false)
		  return false
		}
	  }
	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => {
				console.log("dd",response)
				handleUser((response.user));
			}).catch((e) => console.log("sss", e));
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => handleUser(false));
	};

	useEffect(() => {
		//const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)
		//return () => unsubscribe()
	  }, [])

	return {
		user,
		signinWithGitHub,
		signout,
	};
};

const formatUser = (user) => {
	return {
	  uid: user.uid,
	  email: user.email,
	  name: user.displayName,
	  provider: user.providerData[0].providerId,
	  photoUrl: user.photoURL,
	}
  }