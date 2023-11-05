import React from 'react';
import { toast } from 'react-toastify';
import { api } from '../api';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '../assets';

const ConfirmModal: React.FC<{ id: string }> = ({ id }) => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        api.delete
            .food(id)
            .then((res) => {
                if (res.status === 204) {
                    toast.success('Рецепт видалений', toastOptions);
                    navigate('/');
                }
            })
            .catch((err) => {
                toast.error(`Упс, сталась помилка: ${err.message}`);
            });
    };
    return (
        <>
            <button
                className='btn-del flex space-x-2'
                type='button'
                onClick={() => setShowModal(true)}
            >
                <span>Видалити</span> <TrashIcon />
            </button>
            {showModal ? (
                <>
                    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                        <div className='relative w-auto my-6 mx-5 md:mx-auto max-w-3xl'>
                            <div className='rounded-lg shadow-lg relative flex flex-col w-full bg-background dark:bg-backgroundDark outline-none focus:outline-none'>
                                <div className='p-5 rounded-t'>
                                    <h3 className='text-xl lg:text-2xl font-semibold'>
                                        {' '}
                                        Ви дійсно бажаєте видалити цей рецепт?
                                    </h3>
                                </div>
                                <div className='flex items-center justify-end p-6 rounded-b space-x-5'>
                                    <button
                                        className='btn-del'
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Ні
                                    </button>
                                    <button
                                        className='btn-suc'
                                        type='button'
                                        onClick={() => {
                                            handleDelete(id);
                                            setShowModal(false);
                                        }}
                                    >
                                        Так
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='fixed inset-0 z-40 bg-black/40'></div>
                </>
            ) : null}
        </>
    );
};
export default ConfirmModal;
