import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { ImageIcon } from '../assets';
import SkeletonSearch from './Skeleton/SkeletonSearch';
import { foodCardProps } from '../types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../api';
import { toastOptions } from '../lib/toastOptions';
import useDebounce from '../hooks/useDebounce';

const SearchList: React.FC<{ searchName: string }> = ({ searchName }) => {
    const [loading, setLoading] = useState(false);
    const [findItem, setFindItem] = useState<foodCardProps[] | null>(null);

    const debouncedSearch = useDebounce(searchName, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true);
            api.get
                .search(debouncedSearch)
                .then((res) => setFindItem(res.data))
                .catch((error) => {
                    toast.error(`Упс, сталась помилка ${error.message}`, toastOptions);
                })
                .finally(() => setLoading(false));
        }
    }, [debouncedSearch]);

    return (
        <>
            {debouncedSearch && (
                <ul
                    id='searchList'
                    className={`absolute top-12 bg-secondary dark:bg-secondaryDark left-0 right-0 max-h-[190px] px-3 py-2 space-y-2 overflow-y-auto z-50 border-b-2`}
                >
                    {loading ? (
                        <li className=''>
                            <SkeletonSearch />
                        </li>
                    ) : findItem?.length ? (
                        findItem.map((item) => (
                            <li
                                className='odd:bg-primary dark:odd:bg-backgroundDark even:bg-secondary dark:even:bg-secondaryDark'
                                key={item._id}
                            >
                                <Link to={`/${item.category}/${item._id}`}>
                                    <div className='flex space-x-3'>
                                        <div className='h-12 w-16'>
                                            {item.images?.length ? (
                                                <LazyLoadImage
                                                    alt={item.name}
                                                    src={item.images[0]}
                                                    effect='blur'
                                                    className='h-full w-full object-cover'
                                                    wrapperClassName='h-12 w-16'
                                                />
                                            ) : (
                                                <ImageIcon />
                                            )}
                                        </div>
                                        <p className='leading-none py-1 line-clamp-2'>
                                            {item.name}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <div className='px-3 py-2'>Не знайдено</div>
                    )}
                </ul>
            )}
        </>
    );
};

export default SearchList;
