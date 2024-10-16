import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar5';
import FAQs from '../../components/student/FAQs';
import Faqs from './FAQpage.module.css'

export default function Questions() {
  return (
    <div className={Faqs['faq-page']}>
    <div className={Faqs.faq}>
      <Header />
      <div className={Faqs['faq-content']}>
        <Sidebar />
        <FAQs />
      </div>
    </div>
    </div>
  );
}