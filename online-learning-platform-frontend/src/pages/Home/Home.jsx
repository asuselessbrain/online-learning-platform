import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import NavBar from '../../Components/Shared/NavBar';

const Home = () => {

    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
            <NavBar />
            Home
        </div>
    );
};

export default Home;