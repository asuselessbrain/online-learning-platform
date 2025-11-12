import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import Hero from '../../Components/Home/Hero';
import Statas from '../../Components/Home/Statas';
import BecomeAInstructor from '../../Components/Home/BecomeAInstructor';
import HowItWork from '../../Components/Home/HowItWork';
import StudentTestimonial from '../../Components/Home/StudentTestimonial';
import ReadyToStart from '../../Components/Home/ReadyTostart';
import LatestNews from '../../Components/Home/LatestNews';
import Supporter from '../../Components/Home/Supporter';
import PopularCourses from '../../Components/Home/PopularCourses';

const Home = () => {

    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
           <Hero />
           <Statas />
           <PopularCourses />
           <BecomeAInstructor />
           <HowItWork />
           <ReadyToStart />
           <StudentTestimonial />
           <Supporter />
           <LatestNews />
        </div>
    );
};

export default Home;