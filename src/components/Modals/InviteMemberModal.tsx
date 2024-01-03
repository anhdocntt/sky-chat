import React, { useContext, useState } from 'react';
import "./InviteMemberModal.css";
import { Avatar, Form, Input, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { Room } from '../../interfaces/Room';
import { addDocument } from '../../firebase/service';
import { collection } from '../../firebase/collection';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

interface Option {
  value: string;
  label: string;
  photoURL?: string;
}

interface DebounceSelectProps {
  fetchOptions: (value: string, curMembers: (string | undefined)[]) => Promise<Option[]>;
  debounceTimeout?: number;
  curMembers: (string | undefined)[];
  [key: string]: any;
}

const DebounceSelect: React.FC<DebounceSelectProps> = ({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions: Option[]) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

export default function InviteMemberModal() {
  const { selectedRoom, isInviteMemberVisible, setIsInviteMemberVisible } = useContext(AppContext);
  const [form] = Form.useForm();

  const fetchUserList = async (search: string, curMembers: (string | undefined)[]) => {
    return db
    .collection(collection.users)
    .where('keywords', 'array-contains', search?.toLowerCase())
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data()?.displayName,
          value: doc.data()?.uid,
          photoURL: doc.data()?.photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value))
    });
  };

  const handleOk = () => {


    form.resetFields();
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="Invite member"
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect 
            fetchOptions={fetchUserList}
            curMembers={selectedRoom?.members || []}
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            placeholder='Nhập tên thành viên'
            style={{ width: '100%' }}
          />
        </Form>
      </Modal>
    </div>
  )
}

