import axios from 'axios';
import Form from '../components/Form';
import { useState, useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState([]);

    const fetch = async () =>
        await axios.get('http://localhost:4000/food').then((res) => setData(res.data));

    useEffect(() => {
        fetch();
    }, []);
    return (
        <div className={`bg-background dark:bg-backgroundDark dark:text-white flex-1 `}>
            <Form />
        </div>
    );
};

export default Home;
