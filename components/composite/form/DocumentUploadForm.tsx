import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Upload, Select, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase'; // Đường dẫn tới file firebase.ts
import Auth from '@/context/AuthContext';
import { getAllTags } from '@/services/editorTag';
import { getAllCategories } from '@/services/editorCategory';

const { Option } = Select;

const DocumentUploadForm: React.FC = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { userInfo } = Auth.useContainer();
  const [form] = Form.useForm(); // Tạo instance form

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCategories(allCategories.map((tag: any) => tag.name));
      } catch (error) {
        console.error('Failed to fetch tags', error);
      }
    };

    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTags(allTags.map((tag: any) => tag.name));
      } catch (error) {
        console.error('Failed to fetch tags', error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  const handleUploadToFirebase = (file: UploadFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `documents/${file.name}`);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    if (!fileList.length) {
      notification.error({ message: 'Vui lòng chọn file để tải lên' });
      return;
    }

    setUploading(true);
    
    try {
      const fileUrl = await handleUploadToFirebase(fileList[0]);

      const documentData = {
        ...values,
        fileUrl,
        author: userInfo?.uid,
      };

      const response = await fetch('/api/document/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        notification.success({
          message: 'Tải lên tài liệu thành công!',
        });
        form.resetFields(); // Làm mới form khi upload thành công
        setFileList([]); // Reset lại danh sách file
      }
    } catch (error) {
      notification.error({
        message: 'Tải lên thất bại',
        description: 'Đã xảy ra lỗi khi tải lên tài liệu. Vui lòng thử lại.',
      });
    } finally {
      setUploading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <Form
      form={form} // Kết nối form với instance đã tạo
      name="upload-document"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      onFinish={onFinish}
      autoComplete="off"
      className="pt-20"
    >
      <h2 className="text-center text-2xl font-bold mb-10 mt-5">Upload tài liệu</h2>

      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
      >
        <Input placeholder="Nhập tiêu đề tài liệu" />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea rows={4} placeholder="Nhập mô tả tài liệu" />
      </Form.Item>

      <Form.Item
        label="Thể loại"
        name="category"
        rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
      >
        <Select placeholder="Chọn thể loại">
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tài liệu"
        name="file"
        rules={[{ required: true, message: 'Vui lòng tải lên tài liệu!' }]}
      >
        <Upload
          name="file"
          beforeUpload={() => false}
          fileList={fileList}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          listType="text"
        >
          <Button icon={<UploadOutlined />}>Chọn file</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Nguồn"
        name="source"
      >
        <Input placeholder="Nguồn tài liệu (nếu có)" />
      </Form.Item>

      <Form.Item
        label="Điểm tải về"
        name="downloadPoints"
        rules={[{ type: 'number', min: 0, message: 'Nhập số điểm tải về' }]}
      >
        <InputNumber placeholder="Nhập số điểm yêu cầu để tải" />
      </Form.Item>

      <Form.Item
        label="Gắn tag"
        name="tags"
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Nhập tag"
          allowClear
        >
          {tags.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
        <Button type="primary" htmlType="submit" loading={uploading}>
          {uploading ? 'Đang tải lên...' : 'Upload'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DocumentUploadForm;
