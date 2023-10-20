import { NavLink } from 'react-router-dom';
import Container from './Container';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../assets';
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
                    <div>
                        <img
                            src=''
                            alt=''
                        />
                    </div>
                    <nav className='hidden md:flex space-x-3 font-semibold'>
                        <NavLink to={'/'}>Головна</NavLink>
                        <NavLink to={'/soups'}>Супи</NavLink>
                        <NavLink to={'/main'}>Другі страви</NavLink>
                        <NavLink to={'/salads'}>Салати</NavLink>
                        <NavLink to={'/desserts'}>Десерти</NavLink>
                        <div
                            onClick={handleThemeChange}
                            className='flex items-center cursor-pointer'
                        >
                            {isThemeDark ? <SunIcon /> : <MoonIcon />}
                        </div>
                    </nav>
                    <div className='block md:hidden'>
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='bg-primary h-screen w-screen'>
                        <nav className='flex flex-col space-y-3 font-semibold ml-5 text-2xl'>
                            <NavLink to={'/'}>Головна</NavLink>
                            <NavLink to={'/soups'}>Супи</NavLink>
                            <NavLink to={'/main'}>Другі страви</NavLink>
                            <NavLink to={'/salads'}>Салати</NavLink>
                            <NavLink to={'/desserts'}>Десерти</NavLink>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
};

export default Header;
