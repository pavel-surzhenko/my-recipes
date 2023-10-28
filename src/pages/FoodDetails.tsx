import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { FoodCardProps } from '../types';
import Container from '../components/Container';
import { ImageIcon } from '../assets/ImageIcon';
import TimeIcon from '../assets/TimeIcon';
import { foodCategory } from '../types/FoodCardProps';
import { toast } from 'react-toastify';
import FoodCard from '../components/FoodCard';
import CategoryLabel from '../components/CategoryLabel';

const FoodDetails = () => {
    const { id, foodType } = useParams<{ id: string; foodType: foodCategory }>();
    const [data, setData] = useState<FoodCardProps | null>(null);
    const [similarFood, setSimilarFood] = useState<FoodCardProps[] | null>(null);

    useEffect(() => {
        if (id) {
            api.get
                .byId(id)
                .then((res) => setData(res))
                .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
            if (foodType) {
                api.get[foodType]()
                    .then((res) => setSimilarFood(res))
                    .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
            }
        }
    }, [id, foodType]);

    return (
        <section className='page'>
            <Container>
                <div className='flex  my-5 space-x-5'>
                    <div className='bg-primary '>{data?.img ? '' : <ImageIcon />}</div>
                    <div className='grow space-y-3'>
                        <h1 className='text-center text-xl font-semibold'>{data?.name}</h1>
                        <div className='flex space-x-5 justify-between'>
                            <div className='flex space-x-2 items-center'>
                                <TimeIcon /> <p>Час приготування: time</p>
                            </div>
                            {data?.category && (
                                <div className='flex space-x-2 items-center'>
                                    <p>Категорія:</p> <CategoryLabel category={data.category} />
                                </div>
                            )}
                        </div>
                        <div>
                            <p>Інгрідієнти:</p>
                        </div>
                        <div>
                            <h3 className='text-lg font-medium text-center mb-5'>
                                Спосіб приготування
                            </h3>
                            {data?.instruction?.map((step, index) => (
                                <div key={index}>
                                    <p className='font-medium text-center mb-2'>Крок {index + 1}</p>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='text-lg font-semibold mb-5'>Дивіться також</h4>
                    <div className='flex space-x-5 overflow-x-scroll'>
                        {similarFood?.map((food) => (
                            <FoodCard {...food} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FoodDetails;
