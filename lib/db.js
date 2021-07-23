import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true }).then(()=>console.log("done")).catch((e)=>console.log("error",e));
}

export function createSite(data) {
  return firestore.collection("sites").add(data).catch((e)=> console.log(e));
}

export function createFeedback(data) {
  return firestore.collection("feedback").add(data);
}
