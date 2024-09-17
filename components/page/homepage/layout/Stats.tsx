import React, { useEffect, useState } from 'react';
import { DownloadOutlined, FileOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState({
    totalDocuments: 15000,
    totalUsers: 10000,
    totalDownloads: 20000,
  });

  return (
    <div className="bg-gray-900 text-white py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-[52px] font-bold mb-6 leading-[80px]">
          <span
            className="text-gradient"
            style={{
              background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Khám Phá
          </span>{' '}
          Sức Mạnh Của Tri Thức Và Chia Sẻ Cộng Đồng
        </h2>
        <p className="text-lg text-gray-300 mb-24 max-w-2xl mx-auto">
          Chào mừng bạn đến với kho tài liệu học tập đa dạng và chất lượng, nơi mà mỗi tài liệu đều là một cánh cửa mở ra tri thức mới. 
          Cùng chúng tôi xây dựng một cộng đồng chia sẻ kiến thức rộng lớn, giúp đỡ lẫn nhau trên con đường học tập và phát triển bản thân. 
          Không chỉ là nơi để lưu trữ, mà còn là một nền tảng kết nối những bộ óc đam mê khám phá và học hỏi!
        </p>

        <div className="flex justify-around items-center">
          {/* Tổng số tài liệu */}
          <div className="flex items-center space-x-4">
            <div className='p-6 bg-white bg-opacity-20 rounded-3xl'>
                <FileOutlined style={{ fontSize: '40px', color: '#FFFF' }} />
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold block mb-3">Hơn {stats.totalDocuments}</span>
              <span className="text-xl text-gray-400">Tài liệu</span>
            </div>
          </div>

          {/* Tổng số người dùng */}
          <div className="flex items-center space-x-4">
            <div className='p-6 bg-white bg-opacity-20 rounded-3xl'>
                <UsergroupAddOutlined style={{ fontSize: '40px', color: '#e91e63' }} />
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold block mb-3">Hơn {stats.totalUsers}</span>
              <span className="text-xl text-gray-400">Người dùng</span>
            </div>
          </div>

          {/* Tổng số lượt tải */}
          <div className="flex items-center space-x-4">
            <div className='p-6 bg-white bg-opacity-20 rounded-3xl'>
                <DownloadOutlined style={{ fontSize: '40px', color: '#4c9ff0' }} />
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold block mb-3">Hơn {stats.totalDownloads}</span>
              <span className="text-xl text-gray-400">Lượt tải</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
