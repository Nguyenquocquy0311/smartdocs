import { Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { routes } from "@/constant/routes";
import UserMenu from "./UserMenu";
import CategoriesMenu from "./CategoriesMenu";
import Auth from "@/context/AuthContext";

export default function Header() {
  const {
    userInfo,
  } = Auth.useContainer();

  const [isAtTop, setIsAtTop] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const redirectLogin = () => {
    router.push({
      pathname: routes.login,
      query: { returnUrl: router.asPath }
    });
  }

  const redirectSignup = () => {
    router.push({
      pathname: routes.signup,
      query: { returnUrl: router.asPath }
    });
  }

  const redirectUpload = () => {
    if (userInfo) {
      router.push(routes.upload)
    } else {
      setOpenLoginModal(true);
    }
  }

  const redirectDocumentPage = () => {
    router.push(routes.documents)
  }

  const handleOk = () => {
    setOpenLoginModal(false);
    router.push({
      pathname: routes.login,
      query: { returnUrl: router.asPath }
    });
  }

  const handleCancel = () => {
    setOpenLoginModal(false);
  }

  return (
    <header className={classNames("fixed z-50 w-full h-16 bg-cover flex items-center justify-between px-10", isAtTop && router.pathname.includes(routes.home) ? "bg-hero" : "bg-white shadow-md")}>
      <Logo />

      <div className="grid grid-flow-col items-center space-x-4">
        {/* <Input.Search placeholder="Tìm kiếm" /> */}
        {/* <CategoriesMenu/> */}
        <Button type="link" className="text-slate-600 font-semibold" onClick={redirectDocumentPage}>Tài liệu</Button>

        {userInfo ? (
          <div className="flex items-center space-x-6">
            <Button type="primary" className="font-semibold" onClick={redirectUpload}><UploadOutlined />Tải lên</Button>
            <UserMenu/>
          </div>
        ) : (
          <div>
            <Button type="link" className="text-slate-600 font-semibold" onClick={redirectLogin}>Đăng nhập</Button>
            <Button type="link" className="text-slate-600 font-semibold" onClick={redirectSignup}>Đăng ký</Button>
          </div>
        )}
        <Modal title="Đã có lỗi xảy ra !!!" open={openLoginModal} onOk={handleOk} onCancel={handleCancel} centered>
          <p>Vui lòng đăng nhập để tiếp tục</p>
        </Modal>
      </div>
    </header>
  );
}
