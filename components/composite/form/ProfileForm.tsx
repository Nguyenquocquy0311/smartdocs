import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Upload, notification } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase';
import Auth from '@/context/AuthContext'; 

const ProfileForm: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { userInfo } = Auth.useContainer();
  const [form] = Form.useForm(); 
    
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        fullName: userInfo.displayName,
        email: userInfo.email,
      });

      if (userInfo.photoURL) {
        setFileList([
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: userInfo.photoURL,
          } as UploadFile,
        ]);
      }
    }
  }, [userInfo, form]);

  const handleUploadToFirebase = (file: UploadFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `avatars/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file as unknown as Blob);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onFinish = async (values: any) => {
    setUploading(true);
    
    try {
      let photoUrl = userInfo?.photoURL;
      if (fileList.length) {
        photoUrl = await handleUploadToFirebase(fileList[0]);
      }

      const profileData = {
        ...values,
        photoUrl,
        userId: userInfo?.uid,
      };

    //   await updateUserProfile(profileData);

      notification.success({
        message: 'Cập nhật hồ sơ thành công!',
      });
      form.resetFields();
      setFileList([]);
    } catch (error) {
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật hồ sơ. Vui lòng thử lại.',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <Form
      form={form}
      name="profile-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      onFinish={onFinish}
      autoComplete="off"
      className="pt-20 h-screen"
    >
      <h2 className="text-center text-2xl font-bold mb-10 mt-5">Cập nhật hồ sơ</h2>

      <Form.Item
        label="Tên đầy đủ"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}
      >
        <Input placeholder="Nhập tên đầy đủ" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng định dạng email!' }]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Ảnh đại diện"
        name="avatar"
      >
        <Upload
          name="avatar"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleFileChange}
          accept="image/*"
          listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
        <Button type="primary" htmlType="submit" loading={uploading}>
          {uploading ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
