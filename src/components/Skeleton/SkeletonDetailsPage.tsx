import Skeleton from 'react-loading-skeleton';
import Container from '../Container';
import SkeletonCard from './SkeletonCard';
import { useContext } from 'react';
import useTailwind from '../../hooks/useTailwind';
import { ThemeContext } from '../../lib/context';

const SkeletonDetailsPage = () => {
    const {
        theme: {
            colors: { secondary, secondaryDark },
        },
    } = useTailwind();

    const { isThemeDark } = useContext(ThemeContext);

    return (
        <section className='page'>
            <Container>
                <>
                    <div className='flex  my-5 space-x-5 w-full'>
                        <div className='w-[450px] hidden smd:block rounded-md overflow-hidden'>
                            <Skeleton
                                width={450}
                                height={250}
                                baseColor={isThemeDark ? secondaryDark : secondary}
                            />
                        </div>
                        <div className='grow space-y-5'>
                            <div className='smd:hidden'>
                                <div className='w-full rounded-md overflow-hidden'>
                                    <Skeleton
                                        width='100%'
                                        height={300}
                                        baseColor={isThemeDark ? secondaryDark : secondary}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <Skeleton
                                    height={30}
                                    width={200}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                            </div>
                            <div className='flex space-x-3 justify-between'>
                                <Skeleton
                                    height={20}
                                    width={window.innerWidth > 500 ? 200 : 100}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                                <Skeleton
                                    height={20}
                                    width={window.innerWidth > 500 ? 200 : 100}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                            </div>
                            <div className='space-y-3'>
                                <Skeleton
                                    height={25}
                                    width={250}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                                <Skeleton
                                    height={20}
                                    width={150}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                                <Skeleton
                                    height={20}
                                    width={150}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                                <Skeleton
                                    height={20}
                                    width={150}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <Skeleton
                                    width={250}
                                    height={25}
                                    baseColor={isThemeDark ? secondaryDark : secondary}
                                />
                            </div>
                            <div>
                                <Skeleton baseColor={isThemeDark ? secondaryDark : secondary} />
                                <Skeleton baseColor={isThemeDark ? secondaryDark : secondary} />
                                <Skeleton baseColor={isThemeDark ? secondaryDark : secondary} />
                                <Skeleton baseColor={isThemeDark ? secondaryDark : secondary} />
                            </div>
                        </div>
                    </div>

                    <div className='mb-5 space-y-2 hidden md:block'>
                        <Skeleton
                            width={200}
                            height={25}
                            baseColor={isThemeDark ? secondaryDark : secondary}
                        />

                        <div className='space-x-5 flex'>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    </div>
                </>
            </Container>
        </section>
    );
};

export default SkeletonDetailsPage;
