import Layout from "@/components/Layout"
import LoginPage from "@/components/page/LoginPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Đăng nhập',
      description: 'Description',
     }}>
      <LoginPage/>
    </Layout>
  )
}

export default Page;
