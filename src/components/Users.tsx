import axios from 'axios';
import { useState, useEffect } from 'react';

const Users = () => {
    const [data, setData] = useState();
    const [message, setMessage] = useState('');

    const fetch = async () =>
        await axios.get('http://localhost:4000/users').then((res) => setData(res.data));

    const post = async () => {
        const postData = {
            email: 'myemail',
            name: 'name is',
        };
        await axios
            .post('http://localhost:4000/users', postData)
            .then((res) => setMessage(res.data));
    };
    useEffect(() => {
        fetch();
    }, []);

    console.log(data);

    return (
        <>
            {data?.map((name) => (
                <p>{name.name}</p>
            ))}
            <button onClick={post}>click</button>
            <p className='bg-gray-200'>{message}</p>
        </>
    );
};

export default Users;
