import React, { useState } from 'react';
import Header from '../components/Header';

// Dữ liệu mẫu cho gia sư và khóa học
const courses = [
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
  { id: 'kids', name: 'Tiếng Anh trẻ em' },
  { id: 'business', name: 'Tiếng Anh doanh nghiệp' },
];

const tutors = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: '8 năm kinh nghiệm luyện thi IELTS, TOEIC.',
    courses: ['ielts', 'toeic'],
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Chuyên tiếng Anh trẻ em, phát âm chuẩn.',
    courses: ['kids'],
  },
  {
    id: 3,
    name: 'Lê Văn C',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Tiếng Anh giao tiếp doanh nghiệp, 5 năm kinh nghiệm.',
    courses: ['business'],
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Gia sư luyện thi IELTS, TOEIC, tiếng Anh trẻ em.',
    courses: ['ielts', 'toeic', 'kids'],
  },
];

const TutorsPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const filteredTutors = selectedCourse === 'all'
    ? tutors
    : tutors.filter(tutor => tutor.courses.includes(selectedCourse));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Đội ngũ Gia sư</h1>
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg border ${selectedCourse === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} font-semibold`}
              onClick={() => setSelectedCourse('all')}
            >
              Tất cả
            </button>
            {courses.map(course => (
              <button
                key={course.id}
                className={`px-4 py-2 rounded-lg border ${selectedCourse === course.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} font-semibold`}
                onClick={() => setSelectedCourse(course.id)}
              >
                {course.name}
              </button>
            ))}
          </div>
          {/* Tutor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <img src={tutor.avatar} alt={tutor.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
                <h2 className="text-xl font-bold text-blue-700 mb-2">{tutor.name}</h2>
                <p className="text-gray-600 text-center mb-2">{tutor.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.courses.map(cid => {
                    const course = courses.find(c => c.id === cid);
                    return course ? (
                      <span key={cid} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        {course.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsPage;