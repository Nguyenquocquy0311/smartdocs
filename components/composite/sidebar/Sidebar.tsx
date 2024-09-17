import { useMenuContext } from '@/context/MenuSidebarContext';
import { BarsOutlined, CommentOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, SnippetsOutlined, TagsOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';

export default function Sidebar() {
    const [scaleSidebar, setScaleSidebar] = useState(false);
    const { activeMenu, setActiveMenu } = useMenuContext(); // Use the context

    const menu = [
        {
            icon: <UsergroupDeleteOutlined />,
            title: 'Người dùng',
            key: 'user'
        },
        {
            icon: <SnippetsOutlined />,
            title: 'Tài liệu',
            key: 'doc'
        },
        {
            icon: <BarsOutlined />,
            title: 'Thể loại',
            key: 'category'
        },
        // {
        //     icon: <FileOutlined />,
        //     title: 'File upload',
        //     key: 'file'
        // },
        {
            icon: <CommentOutlined />,
            title: 'Bình luận',
            key: 'comment'
        },
        {
            icon: <TagsOutlined />,
            title: 'Tag',
            key: 'tag'
        },
        {
            icon: <SettingOutlined />,
            title: 'Cài đặt',
            key: 'settings'
        },
    ];

    const handleScaleSidebar = () => {
        setScaleSidebar(!scaleSidebar);
    }

    const handleMenuClick = (key: string) => {
        setActiveMenu(key); // Update active menu state
    }

    return (
        <div className={classNames("h-full shadow-md", scaleSidebar ? "w-60 border-r border-gray-200" : "w-20 bg-gray-100")}>
            <div className="py-4 px-4">
                <ul className="list-none font-sans">
                    {menu.map((item) => (
                        <li
                            key={item.key}
                            className={classNames(
                                "my-1 py-3 px-4 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer",
                                activeMenu === item.key && 'bg-blue-400 text-white'
                            )}
                            onClick={() => handleMenuClick(item.key)}
                        >
                            {item.icon}
                            {scaleSidebar && <span className='mx-4'>{item.title}</span>}
                        </li>
                    ))}
                    <li className='w-full border-b-[3px]'></li>
                    <li className="fixed bottom-6 ml-4 cursor-pointer" onClick={handleScaleSidebar}>
                        {scaleSidebar ? <MenuFoldOutlined /> : <Tooltip title='Mở rộng'><MenuUnfoldOutlined /></Tooltip>}
                        {scaleSidebar && <span className='mx-4'>Thu gọn</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
}
