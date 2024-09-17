
import Footer from "@/components/common/Footer";
import Header from "@/components/composite/header/Header";
import Hero from "./layout/Hero";
import NewDocuments from "./layout/NewDocs";
import PopularTags from "./layout/PopularTags";
import FAQ, { FAQItem } from "./layout/FAQ";
import Stats from "./layout/Stats";
import SmoothTop from "@/components/composite/SmoothTop";

export default function HomePage() {
  const fagTitle = 'Câu hỏi thường gặp';
  const faqItems: FAQItem[] = [
    {
      title: "Làm thế nào để tải xuống tài liệu?",
      content: "Bạn có thể tải xuống tài liệu bằng cách nhấp vào nút 'Tải xuống' trên trang chi tiết tài liệu.",
    },
    {
      title: "Tôi có cần đăng ký tài khoản để tải tài liệu không?",
      content: "Bạn cần phải có tài khoản và đăng nhập để tải xuống tài liệu. Bạn cũng có thể đăng nhập bằng tài khoản Google.",
    },
    {
      title: "Làm thế nào để kiếm thêm điểm để tải tài liệu VIP?",
      content: "Bạn có thể kiếm điểm bằng cách đóng góp tài liệu, bình luận hữu ích, hoặc tham gia các sự kiện của cộng đồng.",
    },
    {
      title: "Tài liệu VIP là gì?",
      content: "Tài liệu VIP là những tài liệu chất lượng cao và yêu cầu số điểm nhất định để tải xuống.",
    },
    {
      title: "Làm thế nào để liên hệ với bộ phận hỗ trợ?",
      content: "Bạn có thể liên hệ với chúng tôi qua email tại support@smartdocs.com hoặc qua số hotline: 0123-456-789.",
    },
  ];

  return (
    <>
      <Header/>
      <div className="pt-16">
        <Hero/>
        <NewDocuments/>
        <Stats />
        <PopularTags/>
        <FAQ title={fagTitle} faqs={faqItems}/>
        <SmoothTop/>
        <Footer/>
      </div>
    </>
  );
}
