import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Form from '../components/Form';
import { api } from '../api';
import { FoodCardProps } from '../types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditRecipe = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<FoodCardProps | null>(null);

    useEffect(() => {
        if (id) {
            api.get
                .byId(id)
                .then((res) => setData(res))
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                });
        }
    }, [id]);

    return (
        <section className={`page bg-new_recipes-bg`}>
            <Container>{data && <Form {...data} />}</Container>
        </section>
    );
};

export default EditRecipe;
