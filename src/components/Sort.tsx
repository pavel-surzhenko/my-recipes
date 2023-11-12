import { sortProps } from '../types';

const Sort: React.FC<sortProps> = ({ sorting, setSorting }) => {
    return (
        <div className='flex space-x-5 items-center bg-primary dark:bg-secondaryDark px-5 py-2 rounded-md mt-5 md:mb-10'>
            <div className='font-medium'>Сортувати за:</div>
            <ul className='hidden md:flex space-x-3 [&>li]:cursor-pointer text-black/50 dark:text-white/50 '>
                <li
                    onClick={() => setSorting('date_desc')}
                    className={
                        sorting === 'date_desc'
                            ? 'font-semibold dark:text-white text-black'
                            : 'hover:dark:text-white hover:text-black'
                    }
                >
                    датою ↓
                </li>
                <li
                    onClick={() => setSorting('date_asc')}
                    className={
                        sorting === 'date_asc'
                            ? 'font-semibold dark:text-white text-black'
                            : 'hover:dark:text-white hover:text-black'
                    }
                >
                    датою ↑
                </li>
                <li
                    onClick={() => setSorting('name_asc')}
                    className={
                        sorting === 'name_asc'
                            ? 'font-semibold dark:text-white text-black'
                            : 'hover:dark:text-white hover:text-black'
                    }
                >
                    назвою [а-я]
                </li>
                <li
                    onClick={() => setSorting('name_desc')}
                    className={
                        sorting === 'name_desc'
                            ? 'font-semibold dark:text-white text-black'
                            : 'hover:dark:text-white hover:text-black'
                    }
                >
                    назвою [я-а]
                </li>
            </ul>
            <select
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
                name='category'
                className='input md:hidden'
            >
                <option value='date_desc'>датою ↓</option>
                <option value='date_asc'>датою ↑</option>
                <option value='name_asc'>назва[а-я]</option>
                <option value='name_desc'>назва[я-а]</option>
            </select>
        </div>
    );
};

export default Sort;
