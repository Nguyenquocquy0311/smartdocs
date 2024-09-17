import Layout from "@/components/Layout"
import HomePage from "@/components/page/homepage/HomePage"

const Page = () => {
  return (
    <Layout
    meta={{
      title: 'SmartDocs',
      description: 'Description',
     }}>
      <HomePage/>
    </Layout>
  )
}

export default Page;
