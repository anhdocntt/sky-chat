import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { collection } from "../../enums/collection";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
import { User } from "../../interfaces/User";

export default function SignUpModal() {
  const { isSignUpVisible, setIsSignUpVisible } = useContext(AppContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        const email = form.getFieldsValue().email;
        const password = form.getFieldsValue().password;
        const fullName = form.getFieldsValue().fullName;

        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential: any) => {
            const user = userCredential.user;

            const userData: User = {
              uid: user?.uid,
              displayName: fullName,
              email: user?.email,
              photoURL: user?.photoURL,
              keywords: generateKeywords(fullName),
            };
            addDocument(collection.users, userData);

            form.resetFields();
            setIsSignUpVisible(false);
          })
          .catch((err: any) => {
            alert(err.message);
          });
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSignUpVisible(false);
  };
  return (
    <div>
      <Modal
        title="Sign Up"
        open={isSignUpVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
