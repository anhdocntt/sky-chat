import { GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import firebase from "firebase/app";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import Logo from "../../assets/images/logo.png";
import { collection } from "../../firebase/collection";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
import { User } from "../../interfaces/User";
import "./Login.css";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const [form] = Form.useForm();

  const { setIsSignUpVisible } = useContext(AppContext);

  const handleGoogleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      googleProvider
    );

    if (additionalUserInfo?.isNewUser) {
      const userData: User = {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user?.displayName),
      };
      addDocument(collection.users, userData);
    }
  };

  const handleEmailLogin = () => {
    form
      .validateFields()
      .then(() => {
        const email = form.getFieldsValue().email;
        const password = form.getFieldsValue().password;

        auth.signInWithEmailAndPassword(email, password).catch((err: any) => {
          alert("Wrong email or password information, please try again!");
        });
      })
      .catch(() => {});
  };

  const handleSignUp = () => {
    setIsSignUpVisible(true);
  };

  return (
    <div className="login-wrapper">
      <img src={Logo} alt="Sky Chat" className="logo logo-spin" />
      <span className="login-label">Sky Chat</span>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>
        <Button
          className="primary-button"
          type="primary"
          onClick={handleEmailLogin}
        >
          Login
        </Button>
      </Form>
      <div className="login-methods">
        <Button className="primary-button" onClick={handleSignUp}>
          Sign up
        </Button>
        <Button
          className="primary-button"
          onClick={handleGoogleLogin}
          icon={<GoogleOutlined />}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}
