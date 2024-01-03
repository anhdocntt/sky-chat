import { Row, Col, Button } from "antd";
import "./Login.css";
import firebase from "firebase/app";
import { auth, db } from "../../firebase/config";
import { addDocument } from "../../firebase/service";
import { collection } from "../../firebase/collection";
import { User } from "../../interfaces/User";

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
      }
      addDocument(collection.users, userData);
    }
  };

  return (
    <div className="login-wrapper">
      <Row>
        <Col span={8}>
          <span>Sky Chat</span>
          <Button onClick={handleGoogleLogin}>Login with Google</Button>
        </Col>
      </Row>
    </div>
  )
}