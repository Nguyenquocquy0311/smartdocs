import Footer from "@/components/common/Footer";
import Header from "@/components/composite/header/Header";
import DocumentUploadForm from "@/components/composite/form/DocumentUploadForm";
import { notification } from "antd";

export default function DocumentUploadPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleUpload = async (values: any) => {
    //     try {
    //         // Gửi dữ liệu tài liệu tới API để lưu vào MongoDB
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(values), // Dữ liệu tài liệu bao gồm URL Firebase, userId, etc.
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log("Document uploaded successfully: ", result);
    //             // Hiển thị thông báo thành công
    //             notification.success({ message: 'Tải lên tài liệu thành công !!!' });
    //         } else {
    //             console.error("Failed to upload document: ", response.statusText);
    //             notification.error({ message: 'Tải lên thất bại, vui lòng thử lại !' });
    //         }
    //     } catch (error) {
    //         console.error("Error while uploading document: ", error);
    //     }
    // };

    return (
        <>
            <Header />
            <DocumentUploadForm/>
            <Footer />
        </>
    );
}
