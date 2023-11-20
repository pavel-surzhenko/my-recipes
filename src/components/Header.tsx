import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { CloseIcon, ImageIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../assets';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../lib/context';
import { api } from '../api';
import useDebounce from '../hooks/useDebounce';
import { foodCardProps } from '../types';
import { toast } from 'react-toastify';
import { toastOptions } from '../lib/toastOptions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonSearch from './Skeleton/SkeletonSearch';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { isThemeDark, handleThemeChange } = useContext(ThemeContext);
    const [searchName, setSearchName] = useState<string>('');
    const [findItem, setFindItem] = useState<foodCardProps[] | null>(null);
    const [loading, setLoading] = useState(false);

    const searchListRef = useRef<HTMLFormElement>(null);
    const [hideList, setHideList] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (searchListRef.current && !searchListRef.current.contains(target)) {
                setHideList(true);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchListRef]);

    const debouncedSearch = useDebounce(searchName, 500);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }, [isMenuOpen]);

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
        <header className='bg-primary py-5 text-lg text-white/80 dark:text-white/50 dark:bg-secondaryDark shadow-header'>
            <Container>
                <div className='flex items-center justify-between'>
                    <nav className='hidden md:flex md:text-base lg:text-xl space-x-3 font-semibold'>
                        <NavLink
                            to={'/'}
                            className='hover:dark:text-white hover:text-white'
                        >
                            Головна
                        </NavLink>
                        <NavLink
                            to={'/soups'}
                            className='hover:dark:text-white hover:text-white'
                        >
                            Супи
                        </NavLink>
                        <NavLink
                            to={'/main'}
                            className='hover:dark:text-white hover:text-white'
                        >
                            Другі страви
                        </NavLink>
                        <NavLink
                            to={'/salads'}
                            className='hover:dark:text-white hover:text-white'
                        >
                            Салати
                        </NavLink>
                        <NavLink
                            to={'/desserts'}
                            className='hover:dark:text-white hover:text-white'
                        >
                            Десерти
                        </NavLink>
                    </nav>
                    <div className='order-2 flex relative'>
                        <form
                            className='relative'
                            ref={searchListRef}
                        >
                            <input
                                type='text'
                                placeholder='Пошук...'
                                className=' input text-black dark:text-white'
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                onFocus={() => setHideList(false)}
                            />
                            <button className='absolute h-full  w-1/6 top-0 right-0 flex justify-center items-center'>
                                <SearchIcon />
                            </button>
                        </form>
                        <div
                            onClick={handleThemeChange}
                            className='flex items-center cursor-pointer text-white ml-5'
                        >
                            {isThemeDark ? <SunIcon /> : <MoonIcon />}
                        </div>
                        {debouncedSearch && !hideList && (
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
                    </div>
                    <div className='block md:hidden order-1 mr-2'>
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='bg-primary dark:bg-secondaryDark h-screen w-screen text-white dark:text-white/50'>
                        <nav className='flex flex-col space-y-5 font-semibold ml-5 text-2xl mt-10'>
                            <NavLink
                                to={'/'}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Головна
                            </NavLink>
                            <NavLink
                                to={'/soups'}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Супи
                            </NavLink>
                            <NavLink
                                to={'/main'}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Другі страви
                            </NavLink>
                            <NavLink
                                to={'/salads'}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Салати
                            </NavLink>
                            <NavLink
                                to={'/desserts'}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Десерти
                            </NavLink>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
};

export default Header;
