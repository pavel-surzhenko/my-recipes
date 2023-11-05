import React from 'react';
import { toast } from 'react-toastify';
import { api } from '../api';
import { toastOptions } from '../lib/toastOptions';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '../assets';

const ConfirmModal: React.FC<{ id: string; img: string[] }> = ({ id, img }) => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id: string, img: string[]) => {
        try {
            await api.delete.food(id);
            for (const image of img) {
                const parts = image.split('/');

                const id = parts[parts.length - 1];
                await api.delete.image(id);
            }
            toast.success('Рецепт видалений', toastOptions);
            navigate('/');
        } catch (error) {
            toast.error(`Упс, сталась помилка: ${error}`);
        }
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
                                            handleDelete(id, img);
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
