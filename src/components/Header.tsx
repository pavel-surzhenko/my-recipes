import { NavLink } from 'react-router-dom';
import Container from './Container';
import { CloseIcon, MenuIcon } from '../assets';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <section className='bg-primary py-5 text-lg text-white'>
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
        </section>
    );
};

export default Header;
