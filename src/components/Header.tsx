import { NavLink } from 'react-router-dom';
import Container from './Container';

const Header = () => {
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
                    <div className='flex space-x-3 font-semibold'>
                        <NavLink to={'/'}>Головна</NavLink>
                        <NavLink to={'/soups'}>Супи</NavLink>
                        <NavLink to={'/main'}>Другі страви</NavLink>
                        <NavLink to={'/salads'}>Салати</NavLink>
                        <NavLink to={'/desserts'}>Десерти</NavLink>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Header;
