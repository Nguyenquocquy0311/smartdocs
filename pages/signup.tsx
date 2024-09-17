import Layout from "@/components/Layout"
import SignupPage from "@/components/page/SignupPage";

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs | Đăng ký',
      description: 'Description',
     }}>
      <SignupPage/>
    </Layout>
  )
}

export default Page;
