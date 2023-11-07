import { sortProps } from '../types';

const Sort: React.FC<sortProps> = ({ sorting, setSorting }) => {
    return (
        <div className='flex space-x-5 bg-secondary dark:bg-secondaryDark px-5 py-2 rounded-md mt-5 mb-10'>
            <div className='font-medium'>Сортувати за:</div>
            <ul className='flex space-x-3 [&>li]:cursor-pointer [&>li]:hover:'>
                <li
                    onClick={() => setSorting('date_desc')}
                    className={sorting === 'date_desc' ? 'font-semibold ' : ''}
                >
                    датою ↓
                </li>
                <li
                    onClick={() => setSorting('date_asc')}
                    className={sorting === 'date_asc' ? 'font-semibold ' : ''}
                >
                    датою ↑
                </li>
                <li
                    onClick={() => setSorting('name_asc')}
                    className={sorting === 'name_asc' ? 'font-semibold ' : ''}
                >
                    назвою [а-я]
                </li>
                <li
                    onClick={() => setSorting('name_desc')}
                    className={sorting === 'name_desc' ? 'font-semibold ' : ''}
                >
                    назвою [я-а]
                </li>
            </ul>
        </div>
    );
};

export default Sort;
