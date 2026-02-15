import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgwpvs824406xX1FTmPhhfN4Chr0ihr2A",
    authDomain: "cure-2a849.firebaseapp.com",
    projectId: "cure-2a849",
    storageBucket: "cure-2a849.firebasestorage.app",
    messagingSenderId: "897579535292",
    appId: "1:897579535292:web:ceb6ac5a01acfe912879b9",
    measurementId: "G-Y2Q6G5DS52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export for use in the app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { app, analytics };
