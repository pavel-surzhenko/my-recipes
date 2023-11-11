import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import Container from '../components/Container';
import { toast } from 'react-toastify';
import FoodCard from '../components/FoodCard';
import CategoryLabel from '../components/CategoryLabel';
import SkeletonDetailsPage from '../components/Skeleton/SkeletonDetailsPage';
import { ImageIcon, TimeIcon, PencilIcon } from '../assets';
import ConfirmModal from '../components/ConfirmModal';
import { foodCardProps, foodCategory } from '../types/foodCardProps';

const FoodDetails = () => {
    const { id, foodType } = useParams<{ id: string; foodType: foodCategory }>();
    const [data, setData] = useState<foodCardProps | null>(null);
    const [similarFood, setSimilarFood] = useState<foodCardProps[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (id) {
            api.get
                .byId(id)
                .then((res) => {
                    setData(res);
                    res.images?.length ? setActiveImage(res.images[0]) : setActiveImage(null);
                })
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                    navigate('/');
                })
                .finally(() => setLoading(false));
            if (foodType) {
                api.get[foodType]()
                    .then((res) => setSimilarFood(res.data))
                    .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`));
            }
        }
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, foodType]);

    return (
        <section className='page py-10'>
            <Container>
                {loading ? (
                    <SkeletonDetailsPage />
                ) : (
                    <>
                        {data && id && (
                            <>
                                <div className='flex flex-col smd:flex-row mb-5 smd:space-x-5'>
                                    <div className='hidden smd:block'>
                                        <div className='w-[425px] smd:max-lg:w-[400px] h-[300px]  rounded-md overflow-hidden '>
                                            {activeImage ? (
                                                <img
                                                    src={activeImage}
                                                    alt={data.name}
                                                    className='w-full h-full object-cover'
                                                />
                                            ) : (
                                                <ImageIcon />
                                            )}
                                        </div>
                                        {data.images && data.images.length > 1 && (
                                            <div className='flex pt-5 space-x-3'>
                                                {data.images?.map((img) => (
                                                    <img
                                                        key={img}
                                                        src={img}
                                                        alt={data.name}
                                                        className={`w-[100px] h-[100px] object-cover cursor-pointer rounded-md ${
                                                            activeImage === img ? 'opacity-50' : ''
                                                        }`}
                                                        onClick={() => setActiveImage(img)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className='grow space-y-5'>
                                        <div className='smd:hidden flex justify-center'>
                                            <div className='w-[min(100%,700px)] h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] rounded-md overflow-hidden'>
                                                {activeImage ? (
                                                    <img
                                                        src={activeImage}
                                                        alt={data.name}
                                                        className='w-full h-full object-cover'
                                                    />
                                                ) : (
                                                    <ImageIcon />
                                                )}
                                            </div>
                                        </div>
                                        {data.images && data.images.length > 1 && (
                                            <div className='smd:hidden flex space-x-3'>
                                                {data.images?.map((img) => (
                                                    <img
                                                        key={img}
                                                        src={img}
                                                        alt={data.name}
                                                        className={`w-[75px] h-[75px] object-cover cursor-pointer rounded-md ${
                                                            activeImage === img ? 'opacity-50' : ''
                                                        }`}
                                                        onClick={() => setActiveImage(img)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <h1 className='text-center text-xl font-semibold'>
                                            {data?.name}
                                        </h1>
                                        <div className='flex space-x-3 justify-between'>
                                            <div className='flex space-x-2 items-center whitespace-nowrap'>
                                                <TimeIcon />{' '}
                                                <p className='hidden xs:block'>
                                                    Час приготування:{' '}
                                                    <span className='font-semibold'>
                                                        {data?.time} хв
                                                    </span>
                                                </p>
                                            </div>

                                            <div className='flex space-x-2 items-center'>
                                                <p className='hidden xs:block'>Категорія:</p>{' '}
                                                <CategoryLabel category={data.category} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='space-y-3'>
                                                <div>Інгрідієнти:</div>
                                                <table className='min-w-full bg-secondary dark:bg-secondaryDark shadow-md rounded-lg overflow-hidden'>
                                                    <thead>
                                                        <tr className='text-left border-secondary dark:border-secondaryDark border-b-2'>
                                                            <th className='px-5 py-3 w-2/3 font-medium border-secondary dark:border-secondaryDark border-r-2'>
                                                                Інгредієнт
                                                            </th>
                                                            <th className='px-5 py-3 w-1/3 font-medium'>
                                                                Кількість
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-gray-700'>
                                                        {data.ingredients.map((ingredient) => (
                                                            <tr
                                                                key={ingredient.name}
                                                                className='border-secondary dark:border-secondaryDark border-b'
                                                            >
                                                                <td className='py-2 px-4 border-secondary dark:border-secondaryDark border-r-2'>
                                                                    {ingredient.name}
                                                                </td>
                                                                <td className='py-2 px-4'>
                                                                    {ingredient.quantity +
                                                                        ' ' +
                                                                        ingredient.unit}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-5'>
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
                                <div className='flex justify-end items-center py-5 border-b border-secondary dark:border-secondaryDark'>
                                    <button
                                        className='btn flex space-x-2 mr-5'
                                        onClick={() => navigate(`/edit-recipe/${data._id}`)}
                                    >
                                        <span>Редагувати</span> <PencilIcon />
                                    </button>
                                    {data.images && (
                                        <ConfirmModal
                                            id={id}
                                            img={data.images}
                                        />
                                    )}
                                </div>
                            </>
                        )}

                        {similarFood && similarFood.length && (
                            <div className='mt-10'>
                                <h4 className='text-lg font-semibold mb-5'>Дивіться також</h4>
                                <div
                                    className={`relative ${
                                        similarFood.length > 4 ? 'white-shadow' : ''
                                    }`}
                                >
                                    <div
                                        className={`${
                                            similarFood.length > 4 ? 'overflow-x-scroll' : ''
                                        } flex space-x-5`}
                                    >
                                        {similarFood?.map(
                                            (food) =>
                                                food._id !== data?._id && (
                                                    <div
                                                        key={food._id}
                                                        className='w-[250px] flex-1 mb-4'
                                                    >
                                                        <FoodCard {...food} />
                                                    </div>
                                                )
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
