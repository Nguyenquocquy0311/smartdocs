import Layout from "@/components/Layout";
import DocumentsListPage from "@/components/page/documents/DocumentsListPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Danh sách tài liệu',
      description: 'Description',
     }}>
      <DocumentsListPage/>
    </Layout>
  )
}

export default Page;
