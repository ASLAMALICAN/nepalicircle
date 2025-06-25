import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileDropdown from '../components/UserProfileDropdown';
import UserProfileModal from '../components/UserProfileModal';

import {
  Home, Building, CreditCard, BookOpen, Briefcase, Users, Languages,
  Store, ShieldCheck, Globe, Megaphone, CalendarClock
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('googleUser'));

  const [showProfileModal, setShowProfileModal] = useState(false);

  const announcements = [
    {
      title: 'Enrolment Open for Summer 2025 Term',
      date: 'Now until July 14, 2025',
      content: 'Click here to enrol in your courses before the deadline.'
    },
    {
      title: 'Library Support for Assignments',
      date: 'June 3, 2025',
      content: 'The library team is ready to help you with research, citation, and writing tips.'
    }
  ];

  const events = [
    {
      title: 'Mental Health Workshop',
      date: 'June 17, 10:30–11:00am',
      content: 'From Stress to Success: Prioritizing Mental Health in Student Life'
    },
    {
      title: 'PGWP Information Session',
      date: 'June 17, 2:30–4:00pm',
      content: 'What is a PGWP and how to prepare for it.'
    }
  ];

  const services = [
    { name: 'Airport Pickup', icon: Home, link: '/services/airport' },
    { name: 'Housing Support', icon: Building, link: '/services/housing' },
    { name: 'SIN & Bank Setup', icon: CreditCard, link: '/services/sin-bank' },
    { name: 'Student Resources', icon: BookOpen, link: '/services/student' },
    { name: 'Job Portal', icon: Briefcase, link: '/services/jobs' },
    { name: 'Community Events', icon: Users, link: '/services/community' },
    { name: 'Language Classes', icon: Languages, link: '/services/language' },
    { name: 'Business Directory', icon: Store, link: '/services/directory' },
    { name: 'Legal & Immigration Help', icon: ShieldCheck, link: '/services/legal' },
    { name: 'New to Canada Guide', icon: Globe, link: '/services/new-to-canada' }
  ];

  const handleProfileClick = () => setShowProfileModal(true);

  return (
    <div className="flex flex-row w-full min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 flex-shrink-0">
        <div className="text-sm font-semibold">NEPALI CIRCLE</div>
        <nav className="space-y-2">
          {services.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700"
            >
              <item.icon size={18} />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Welcome,</p>
            <h1 className="text-xl font-semibold">{user?.name || 'Guest'}</h1>
          </div>
          <UserProfileDropdown onProfileClick={handleProfileClick} />
        </div>

        {/* Carousel */}
        <div className="mb-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="rounded-xl shadow-lg"
          >
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1005595243%2F1804718884683%2F1%2Foriginal.20250410-065324?w=940&auto=format%2Ccompress&q=75&sharp=10&s=21e8ae0c90388e0886031c574a1c57df"
                  alt="Nepal Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t39.30808-6/481138765_666853182347196_3338070010209905947_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=8ujRo2JAvKcQ7kNvwGP7mfh&_nc_oc=AdlSapDwrFOpkye4Kofie5UeJRor3wQ5mfmOf21Gj6t6-TwDJMB3YqiSZjaeXdvgCgW5E37JIkVORWna24opGIZD&_nc_zt=23&_nc_ht=scontent.fyvr4-1.fna&_nc_gid=7FsOzsRVA-RA_P4SABgfvw&oh=00_AfO_1wTQWtK01pzAwU1tVw6IF-eUYdvJ9FNcj-setNA9nQ&oe=685E957C"
                  alt="Canada Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-64">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1042114103%2F2195299412973%2F1%2Foriginal.20250530-044823?w=940&auto=format%2Ccompress&q=75&sharp=10&s=650b2b8f26b217ea2cee14cc589e9273"
                  alt="Community Slide"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Dashboard Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Welcome Message */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">👋 Welcome to Nepali Circle!</h2>
            <p className="text-sm text-gray-700">जहाँ नेपाली मनहरू एक आपसमा जोडिन्छन्</p>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Megaphone className="text-blue-600" size={20} /> Announcements
            </h2>
            {announcements.map((a, i) => (
              <div key={i} className="mb-3 border-b pb-2">
                <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                <p className="text-xs text-gray-500">{a.date}</p>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="bg-white shadow p-4 rounded">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <CalendarClock className="text-blue-600" size={20} /> Events
            </h2>
            {events.map((e, i) => (
              <div key={i} className="mb-3 border-b pb-2">
                <p className="text-sm font-semibold text-gray-800">{e.title}</p>
                <p className="text-xs text-gray-500">{e.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Modal */}
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
        />
      </main>
    </div>
  );
};

export default Dashboard;
