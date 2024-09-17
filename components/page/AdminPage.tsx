import { useMenuContext } from "@/context/MenuSidebarContext";
import HeaderAdmin from "../composite/header/HeaderAdmin";
import Sidebar from "../composite/sidebar/Sidebar";
import CategoryTab from "../composite/tabAdmin/CategoryTab";
import TagTab from "../composite/tabAdmin/TagTab";
import DocumentTab from "../composite/tabAdmin/DocumentTab";

export default function AdminPage() {
  const { activeMenu } = useMenuContext();

    const renderTable = () => {
        switch (activeMenu) {
            case 'category':
                return <CategoryTab />;
            case 'tag':
                return <TagTab />;
            case 'doc':
                return <DocumentTab />
            default:
                return <h1>Hello World</h1>; // Default content or message
        }
    };

  return (
    <div className="flex flex-col h-screen">
      <HeaderAdmin />

      <div className="flex flex-grow">
        <Sidebar />

        <div className="flex-grow pt-8 bg-gray-100">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
