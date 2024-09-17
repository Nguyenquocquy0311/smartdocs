import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { routes } from "@/constant/routes";
import { useRouter } from "next/router";

export default function CategoriesMenu() {
    const router = useRouter();

    const handleMenuClick = (category: string) => {
        router.push({
            pathname: routes.documents,
            query: { category },
        });
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={() => handleMenuClick('Tiểu học')}>
                    Tiểu học
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => handleMenuClick('THCS')}>
                    THCS
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => handleMenuClick('THPT')}>
                    THPT
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={() => handleMenuClick('Đại học')}>
                    Đại học
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <Button type="link" className="text-slate-600 font-semibold">
                Các loại tài liệu <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
}
