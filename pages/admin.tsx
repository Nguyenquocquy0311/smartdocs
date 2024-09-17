import Layout from "@/components/Layout"
import AdminPage from "@/components/page/AdminPage";

const Page = () => {
  return (
    <Layout
        noindex
        meta={{
        title: 'SmartDocs - Admin',
        description: 'Description',
      }}>
      <AdminPage/>
    </Layout>
  )
}

export default Page;
