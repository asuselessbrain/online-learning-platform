import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import NavBar from '../../Components/Shared/NavBar';
import Hero from '../../Components/Home/Hero';
import Statas from '../../Components/Home/Statas';

const Home = () => {

    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
           <Hero />
           <Statas />
        </div>
    );
};

export default Home;