import Container from '../components/Container';
import Form from '../components/Form';

const NewRecipe = () => {
    return (
        <section className={`page bg-new_recipes-bg`}>
            <Container>
                <Form />
            </Container>
        </section>
    );
};

export default NewRecipe;
