import { useNavigate } from 'react-router-dom';
import { AddIcon } from '../assets';

const NewRecipeBtn: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-end items-center py-5 border-b border-secondary'>
            <button
                className='btn-suc flex space-x-2'
                onClick={() => navigate('/new-recipe')}
            >
                <span>Додати новий рецепт</span> <AddIcon />
            </button>
        </div>
    );
};

export default NewRecipeBtn;
