import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";

const authContext = createContext();

export const ProviderAuth = ({ children }) => {
	const auth = useProviderAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};

const useProviderAuth = () => {
	const [user, setUser] = useState(null);
	console.log("user", user);
	const signinWithGithub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => {
				setUser(response.user);
				return response.user;
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(false);
			});
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
		return () => unsubscribe();
	}, []);

	return {
		user,
		signinWithGithub,
		signout,
	};
};