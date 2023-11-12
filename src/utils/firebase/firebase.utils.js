import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY_FB}`,
    authDomain: "user-test-13034.firebaseapp.com",
    projectId: "user-test-13034",
    storageBucket: "user-test-13034.appspot.com",
    messagingSenderId: "79067459583",
    appId: "1:79067459583:web:4963495caae98a3edc41ca"
};

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore(firebaseApp)

export const createUserDocumentFromAuth = async (userAuth, addInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            const geoResponse = await axios.get('https://api.ipify.org?format=json')
            const geoInfo = geoResponse.data.ip

            const cityResponce = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_API_KEY}&ip=${geoInfo}`)
            const city = cityResponce.data.city

            const UA = navigator.userAgent
            const lang = navigator.language

            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                geoInfo,
                city,
                UA,
                lang,
                ...addInfo
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}