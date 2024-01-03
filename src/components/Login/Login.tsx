import { Row, Col, Button } from "antd";
import "./Login.css";
import firebase from "firebase/app";
import { auth } from "../../firebase/config";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleGoogleLogin = () => {
    auth.signInWithPopup(googleProvider);
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