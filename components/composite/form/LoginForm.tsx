import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Auth from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { routes } from '@/constant/routes';

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_TIME = 30000;

const LoginForm: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, isLoadingGoogleLogin } = Auth.useContainer();
  const router = useRouter();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeout, setLockTimeout] = useState<NodeJS.Timeout | null>(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const returnUrl = router.query.returnUrl as string || routes.documents;

  useEffect(() => {
    if (isLocked) {
      const timeoutId = setTimeout(() => {
        setIsLocked(false);
        setFailedAttempts(0); // Reset lại số lần thử sau khi hết thời gian khóa
      }, LOCK_TIME);

      setLockTimeout(timeoutId); 

      return () => {
        if (lockTimeout) {
          clearTimeout(lockTimeout); 
        }
      };
    }
  }, [isLocked, lockTimeout]);

  const onFinish = async (values: FieldType) => {
    if (isLocked) {
      notification.error({
        message: 'Tài khoản bị khóa',
        description: 'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau một thời gian!',
      });
      return;
    }

    try {
      const userCredential = await loginWithEmail(values.email, values.password);
      const user = userCredential.user;

      if (user && !user.emailVerified) {
        notification.error({
          message: 'Xác nhận email',
          description: 'Vui lòng xác nhận email trước khi đăng nhập.',
        });
        return;
      }

      notification.success({
        message: 'Đăng nhập thành công',
        description: 'Chào mừng bạn đã quay trở lại!',
      });
      setFailedAttempts(0);
      router.push(returnUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFailedAttempts((prev) => {
        const newAttempts = prev + 1;

        if (newAttempts >= MAX_FAILED_ATTEMPTS) {
          setIsLocked(true);
          notification.error({
            message: 'Tài khoản bị khóa',
            description: `Bạn đã nhập sai mật khẩu quá ${MAX_FAILED_ATTEMPTS} lần. Tài khoản đã bị tạm khóa.`,
          });
        }

        return newAttempts;
      });

      // Phân tích các lỗi từ Firebase
      let errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại!';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Không tìm thấy tài khoản với email này. Vui lòng kiểm tra lại!';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Sai mật khẩu. Vui lòng kiểm tra lại mật khẩu!';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Bạn đã thử quá nhiều lần. Tài khoản đã bị tạm khóa. Vui lòng thử lại sau!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email không hợp lệ. Vui lòng nhập email hợp lệ!';
          break;
        default:
          errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
      }

      notification.error({
        message: 'Lỗi đăng nhập',
        description: errorMessage,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    notification.error({
      message: 'Lỗi nhập liệu',
      description: 'Vui lòng kiểm tra lại các trường đã nhập và thử lại.',
    });
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        router.push(returnUrl);
      })
      .catch(() => {});
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
      <h2 className="text-center font-bold text-2xl mb-8 text-blue-600">Đăng nhập</h2>

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
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password className="rounded-lg" />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>

      <div className='grid grid-flow-col space-x-20 mb-4'>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          noStyle
        >
          <Checkbox>Nhớ mật khẩu</Checkbox>
        </Form.Item>
        <Link href="/signup" className="text-blue-500 hover:underline">Chưa có tài khoản?</Link>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-blue-400"></div>
        <span className="mx-4 text-gray-500">Hoặc</span>
        <div className="flex-grow border-t border-blue-400"></div>
      </div>

      <div className="flex justify-center my-6">
        <Button type="default" className="w-full flex items-center justify-center space-x-3 py-5 text-blue-500 rounded-lg" onClick={handleLoginWithGoogle}>
          {isLoadingGoogleLogin ? <LoadingOutlined /> : <GoogleOutlined />}
          <span>Đăng nhập với Google</span>
        </Button>
      </div>
    </Form>
  )
};

export default LoginForm;
