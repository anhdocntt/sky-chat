import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { collection } from "../../firebase/collection";
import { addDocument } from "../../firebase/service";
import { Room } from "../../interfaces/Room";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    const roomData: Room = {
      name: form.getFieldsValue().name,
      desc: form.getFieldsValue().description,
      members: [uid],
    };
    addDocument(collection.rooms, roomData);

    form.resetFields();
    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal
        title="Add room"
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Type room name" />
          </Form.Item>
          <Form.Item label="Room description" name="description">
            <Input.TextArea placeholder="Type room description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
