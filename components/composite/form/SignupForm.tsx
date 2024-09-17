import React from 'react';
import { Button, Form, Input, Radio, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import Auth from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { routes } from '@/constant/routes';

const SignupForm: React.FC = () => {
  const { signupWithEmail } = Auth.useContainer();
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: { email: string; password: string; name: string; avatar: any; gender: string }) => {
    try {
      const userCredential = await signupWithEmail(values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: values.name,
        photoURL: values.avatar ? URL.createObjectURL(values.avatar.file) : '',
      });

      await sendEmailVerification(user);

      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          password: values.password,
          full_name: values.name,
          gender: values.gender,
          points: 10,
          profile_picture: user.photoURL
        }),
      });

      notification.success({
        message: 'Đăng ký thành công!',
        description: 'Vui lòng kiểm tra email để xác nhận tài khoản.',
      });

      router.push(routes.login);
    } catch (error) {
      console.error('Signup failed', error);
      notification.error({
        message: 'Đăng ký thất bại',
        description: 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-[400px] rounded-lg shadow-lg p-6 bg-white border border-blue-300"
    >
      <h2 className="text-center font-bold text-2xl mb-8 text-blue-600">Đăng ký thành viên</h2>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' },
          { pattern: emailRegex, message: 'Email không hợp lệ!' },
        ]}
        
      >
        <Input className="rounded-lg" />
      </Form.Item>

      <Form.Item
        label="Họ tên"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input className="rounded-lg" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password className="rounded-lg" />
      </Form.Item>

      {/* Trường Giới tính */}
      <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
        <Radio.Group>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Trường Avatar */}
      <Form.Item label="Avatar" name="avatar">
        <Upload beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
        </Upload>
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>

      <div className="flex justify-between">
        <Link href="/login" className="text-blue-500 hover:underline">
          Đã có tài khoản?
        </Link>
      </div>
    </Form>
  );
};

export default SignupForm;
