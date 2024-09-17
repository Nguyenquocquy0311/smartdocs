import { Avatar, Dropdown, Menu } from "antd";
import { CloudDownloadOutlined, CloudUploadOutlined, LikeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import Auth from "@/context/AuthContext";
import { useRouter } from "next/router";
import { routes } from "@/constant/routes";

export default function UserMenu() {
    const {
        userInfo,
        logout,
    } = Auth.useContainer();

    const router = useRouter()

    const menuUser = (
        <Menu>
            <div className="mx-4">
                <p className="font-medium text-lg">{userInfo?.displayName}</p>
                <p>Điểm: 100</p>
            </div>
            <Menu.Divider />
            <Menu.Item key="1" icon={<ProfileOutlined />}>
                Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<CloudUploadOutlined />} onClick={() => router.push(routes.historyUpload)}>
                Tài liệu đã tải lên
            </Menu.Item>
            <Menu.Item key="3" icon={<LikeOutlined />}>
                Tài liệu yêu thích
            </Menu.Item>
            <Menu.Item key="4" icon={<CloudDownloadOutlined />}>
                Tài liệu đã tải xuống
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5" icon={<LogoutOutlined />} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menuUser} placement="bottomRight" trigger={['click']} className="text-lg">
            {(!userInfo?.photoURL || userInfo.photoURL === '') ?  <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer hover:opacity-80" /> :
            <Avatar size="large" src={userInfo?.photoURL} className="cursor-pointer hover:opacity-80" /> }
        </Dropdown>
    );
}