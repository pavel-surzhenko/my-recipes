import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer, Slide } from 'react-toastify';

const Root = () => {
    return (
        <>
            <ToastContainer
                newestOnTop
                closeOnClick
                transition={Slide}
            />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;
