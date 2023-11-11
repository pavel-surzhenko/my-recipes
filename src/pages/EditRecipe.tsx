import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Form from '../components/Form';
import { api } from '../api';
import { foodCardProps_old } from '../types';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SkeletonForm from '../components/Skeleton/SkeletonForm';

const EditRecipe = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<foodCardProps_old | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get
                .byId(id)
                .then((res) => setData(res))
                .catch((err) => {
                    toast.error(`Упс, сталась помилка: ${err.message}`);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    return (
        <section className={`page `}>
            <Container>{data && !loading ? <Form {...data} /> : <SkeletonForm />}</Container>
        </section>
    );
};

export default EditRecipe;
