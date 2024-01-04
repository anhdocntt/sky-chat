import { Row, Col, Button } from "antd";
import "./Login.css";
import firebase from "firebase/app";
import { auth, db } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
import { collection } from "../../firebase/collection";
import { User } from "../../interfaces/User";
import Logo from "../../assets/images/logo.png"

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleGoogleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);

    if (additionalUserInfo?.isNewUser) {
      const userData: User = {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user?.displayName),
      }
      addDocument(collection.users, userData);
    }
  };

  return (
    <div className="login-wrapper">
      <img src={Logo} alt="Sky Chat" className="logo" />
      <span className="login-label">Sky Chat</span>
      <Button className="primary-button" onClick={handleGoogleLogin}>Login with Google</Button>
    </div>
  )
}