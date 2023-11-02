import { NavLink } from 'react-router-dom';
import Container from './Container';
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../assets';
import { useContext, useState } from 'react';
import { ThemeContext } from '../lib/context';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { isThemeDark, handleThemeChange } = useContext(ThemeContext);

    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <header className='bg-primary py-5 text-lg text-white dark:bg-primaryDark'>
            <Container>
                <div className='flex items-center justify-between'>
                    <nav className='hidden md:flex md:text-base lg:text-xl space-x-3 font-semibold'>
                        <NavLink to={'/'}>Головна</NavLink>
                        <NavLink to={'/soups'}>Супи</NavLink>
                        <NavLink to={'/main'}>Другі страви</NavLink>
                        <NavLink to={'/salads'}>Салати</NavLink>
                        <NavLink to={'/desserts'}>Десерти</NavLink>
                    </nav>
                    <div className='order-2 flex space-x-5'>
                        <form className='relative'>
                            <input
                                type='text'
                                placeholder='Пошук...'
                                className=' input text-black dark:text-white'
                            />
                            <button className='absolute h-full  w-1/6 top-0 right-0 flex justify-center items-center'>
                                <SearchIcon />
                            </button>
                        </form>
                        <div
                            onClick={handleThemeChange}
                            className='flex items-center cursor-pointer'
                        >
                            {isThemeDark ? <SunIcon /> : <MoonIcon />}
                        </div>
                    </div>

                    <div className='block md:hidden order-1'>
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='bg-primary h-screen w-screen'>
                        <nav className='flex flex-col space-y-3 font-semibold ml-5 text-2xl mt-5'>
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
