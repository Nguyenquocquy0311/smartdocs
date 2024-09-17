import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, 
  signOut, 
  User 
} from 'firebase/auth';
import { authentication } from '../lib/firebase';
import { useCallback, useEffect, useState } from 'react';
import { 
//   fetchAndActivate, 
  getRemoteConfig
} from 'firebase/remote-config';
import { firebaseApp } from '../lib/firebase';
import { createContainer } from 'unstated-next';

type UserInfo = User | null;

function useAuth() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const [isLoadingGoogleLogin, setIsLoadingGoogleLogin] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoadingGoogleLogin(true);
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(authentication, provider);
      if (res && res.user) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem('user-info', JSON.stringify(res.user));
        setUserInfo(res.user);  // Cập nhật state userInfo
      }
      setIsLoadingGoogleLogin(false);
      return res;
    } catch (e) {
      setIsLoadingGoogleLogin(false);
      throw e;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      setUserInfo(res?.user);
      localStorage.setItem('user-info', JSON.stringify(res?.user));
      return res;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(authentication, email, password);
      setUserInfo(res?.user);
      localStorage.setItem('user-info', JSON.stringify(res?.user));
      return res;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const logout = () => {
    signOut(authentication).then(() => {
      setUserInfo(null);
      localStorage.removeItem('user-info');
    });
  };

//   const getUserInfo = async (token: string) => {
//     // Đây là nơi bạn gọi API lấy thông tin người dùng
//     const response = await getUserInfoApi(token);
//     setLoading(false);

//     if (response?.data?.user) {
//       const expiredDate = response?.data?.user?.subscriber?.expires_date;
//       const newDate = new Date().getTime();

//       // Cài đặt thuộc tính người dùng cho analytics
//       window.gtag('set', 'user_properties', {
//         is_premium: expiredDate && expiredDate * 1000 >= newDate,
//       });
      
//       return response?.data?.user;
//     }
//     window.gtag('set', 'user_properties', {
//       is_premium: false,
//     });
//   };

//   const refreshToken = useCallback(() => {
//     setLoading(true);
//     getUserInfo(authentication?.currentUser?.accessToken ?? "").then((res) => {
//       if (!res?.subscriber) {
//         setTimeout(() => {
//           refreshToken();
//         }, 1000);
//       }
//     });
//   }, []);

  useEffect(() => {
    if (!userInfo) {
      const cachedUserInfo = localStorage.getItem('user-info');
      if (cachedUserInfo) {
        setUserInfo(JSON.parse(cachedUserInfo));
      }
    }
  }, [userInfo]);

  const fetchAndActiveRemoteConfig = useCallback(async () => {
    const remoteConfig = getRemoteConfig(firebaseApp);
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000, // Mỗi 1 giờ fetch lại
      fetchTimeoutMillis: 5000, // Thời gian timeout 5 giây
    };

  }, []);

  return {
    loading,
    loginWithGoogle,
    logout,
    isLoadingGoogleLogin,
    loginWithEmail,
    signupWithEmail,
    userInfo,
    // refreshToken,
    fetchAndActiveRemoteConfig,
    // watermarkConfig,
  };
}

const Auth = createContainer(useAuth);

export default Auth;
