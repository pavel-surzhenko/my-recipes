import axios from 'axios';
import { useState, useEffect } from 'react';
import { AddIcon } from '../assets';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetch = async () =>
        await axios.get('http://localhost:4000/food').then((res) => setData(res.data));

    useEffect(() => {
        fetch();
    }, []);
    return (
        <section className='page'>
            <Container>
                <div className='flex justify-end items-center py-5 border-b border-secondary'>
                    <button
                        className='btn-suc flex space-x-2'
                        onClick={() => navigate('/new-recipe')}
                    >
                        <span>Додати новий рецепт</span> <AddIcon />
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default Home;
