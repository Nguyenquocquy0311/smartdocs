import React from 'react';

const PopularTags = () => {
  const tags = [
    { name: 'Toán lớp 9', views: 1200 },
    { name: 'Tiếng Anh lớp 6', views: 980 },
    { name: 'Ngữ văn lớp 12', views: 850 },
    { name: 'Hóa học lớp 10', views: 730 },
    { name: 'Văn mẫu lớp 8', views: 660 },
    { name: 'Sinh học lớp 11', views: 590 },
  ];

  return (
    <section className="py-8 mt-8 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Thẻ phổ biến</h2>
        <div className="flex flex-wrap justify-center">
          {tags.map((tag, index) => (
            <div key={index} className="m-3 bg-gray-200 px-6 py-3 rounded-full shadow-md">
              <span className="font-semibold text-blue-600">{tag.name}</span>
              <span className="ml-2 text-gray-500">({tag.views} lượt truy cập)</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTags;
