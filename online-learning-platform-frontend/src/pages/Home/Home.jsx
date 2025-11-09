import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import NavBar from '../../Components/Shared/NavBar';
import Hero from '../../Components/Home/Hero';

const Home = () => {

    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
           <Hero />
        </div>
    );
};

export default Home;