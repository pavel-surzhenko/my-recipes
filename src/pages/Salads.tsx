import { useState, useEffect } from 'react';
import { foodCardProps_old } from '../types';
import Container from '../components/Container';
import FoodGrid from '../components/FoodGrid';
import NewRecipeBtn from '../components/NewRecipeBtn';
import { api } from '../api';
import { toast } from 'react-toastify';
import SkeletonGrid from '../components/Skeleton/SkeletonGrid';
import Sort from '../components/Sort';
import ReactPaginate from 'react-paginate';
import { LeftArrowLong } from '../assets/LeftArrowLong';
import { RightArrowLong } from '../assets/RightArrowLong';

const Salads = () => {
    const [data, setData] = useState<foodCardProps_old[]>();
    const [loading, setLoading] = useState(false);
    const [sorting, setSorting] = useState('date_desc');
    const [page, setPage] = useState<number>(1);
    const [countPages, setCountPages] = useState<number>(1);

    const handleSortingChange = (value: string) => {
        setSorting(value);
    };

    useEffect(() => {
        setLoading(true);
        api.get
            .salads(sorting, page)
            .then((res) => {
                setData(res.data);
                setCountPages(res.totalPages);
            })
            .catch((err) => toast.error(`Упс, сталась помилка: ${err.message}`))
            .finally(() => setLoading(false));
    }, [sorting, page]);
    return (
        <section className='page'>
            <Container>
                <NewRecipeBtn />
                <Sort
                    sorting={sorting}
                    setSorting={handleSortingChange}
                />
                {loading ? <SkeletonGrid /> : <>{data && <FoodGrid data={data} />}</>}
                {countPages > 1 && (
                    <ReactPaginate
                        breakLabel={`... `}
                        nextLabel={<RightArrowLong />}
                        onPageChange={(e) => {
                            setPage(e.selected + 1);
                        }}
                        forcePage={page - 1}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={3}
                        pageCount={countPages}
                        previousLabel={<LeftArrowLong />}
                        renderOnZeroPageCount={null}
                        containerClassName='flex text-xl items-center justify-center my-5'
                        pageClassName='mr-3'
                        breakClassName='mr-3'
                        activeLinkClassName='font-semibold bg-secondary dark:bg-secondaryDark px-2 py-1 rounded-lg'
                        disabledLinkClassName='hidden'
                        previousClassName='mr-3'
                    />
                )}
            </Container>
        </section>
    );
};

export default Salads;
