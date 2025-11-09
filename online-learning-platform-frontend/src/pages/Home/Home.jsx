import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import NavBar from '../../Components/Shared/NavBar';
import Hero from '../../Components/Home/Hero';
import Statas from '../../Components/Home/Statas';
import BecomeAInstructor from '../../Components/Home/BecomeAInstructor';
import HowItWork from '../../Components/Home/HowItWork';
import StudentTestimonial from '../../Components/Home/StudentTestimonial';

const Home = () => {

    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
           <Hero />
           <Statas />
           <BecomeAInstructor />
           <HowItWork />
           <StudentTestimonial />
        </div>
    );
};

export default Home;