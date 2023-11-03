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
import SkeletonDetailsPage from '../components/Skeleton/SkeletonDetailsPage';

const FoodDetails = () => {
    const { id, foodType } = useParams<{ id: string; foodType: foodCategory }>();
    const [data, setData] = useState<FoodCardProps | null>(null);
    const [similarFood, setSimilarFood] = useState<FoodCardProps[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (id) {
            api.get
                .byId(id)
                .then((res) => {
                    setData(res);
                })
                .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
                .finally(() => setLoading(false));
            if (foodType) {
                api.get[foodType]()
                    .then((res) => setSimilarFood(res))
                    .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
            }
        }
        window.scrollTo(0, 0);
    }, [id, foodType]);

    return (
        <section className='page'>
            <Container>
                {loading ? (
                    <SkeletonDetailsPage />
                ) : (
                    <>
                        <div className='flex  my-5 space-x-5'>
                            <div className='w-[450px] hidden smd:block rounded-md overflow-hidden'>
                                {data?.images?.length ? (
                                    <img
                                        src={data.images[0]}
                                        alt={data.name}
                                        className='w-full object-contain'
                                    />
                                ) : (
                                    <ImageIcon />
                                )}
                            </div>
                            <div className='grow space-y-5'>
                                <div className='smd:hidden'>
                                    <div className='w-full rounded-md overflow-hidden'>
                                        {data?.images?.length ? (
                                            <img
                                                src={data.images[0]}
                                                alt={data.name}
                                                className='w-full object-contain'
                                            />
                                        ) : (
                                            <ImageIcon />
                                        )}
                                    </div>
                                </div>
                                <h1 className='text-center text-xl font-semibold'>{data?.name}</h1>
                                <div className='flex space-x-3 justify-between'>
                                    <div className='flex space-x-2 items-center'>
                                        <TimeIcon />{' '}
                                        <p className='hidden xs:block'>
                                            Час приготування:{' '}
                                            <span className='font-semibold'>{data?.time} хв</span>
                                        </p>
                                    </div>
                                    {data?.category && (
                                        <div className='flex space-x-2 items-center'>
                                            <p className='hidden xs:block'>Категорія:</p>{' '}
                                            <CategoryLabel category={data.category} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {data?.ingredients && (
                                        <div className='flex space-x-2 items-center'>
                                            <p>Інгрідієнти:</p>
                                            {data.ingredients.map((ingredient) => (
                                                <p>{ingredient.name}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className='text-lg font-medium text-center mb-5'>
                                        Спосіб приготування
                                    </h3>
                                    {data?.instruction?.map((step, index) => (
                                        <div key={index}>
                                            <p className='font-medium underline underline-offset-4 mb-2'>
                                                Крок {index + 1}
                                            </p>
                                            <p>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {similarFood && similarFood.length && (
                            <div className='mb-5'>
                                <h4 className='text-lg font-semibold mb-5'>Дивіться також</h4>
                                <div
                                    className={`relative ${
                                        similarFood.length > 4 ? 'white-shadow' : ''
                                    }`}
                                >
                                    <div className='flex space-x-5 overflow-x-scroll'>
                                        {similarFood?.map(
                                            (food) =>
                                                food._id !== data?._id && <FoodCard {...food} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
};

export default FoodDetails;
