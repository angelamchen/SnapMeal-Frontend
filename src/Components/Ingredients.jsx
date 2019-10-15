import React from 'react';
import { Col, Container, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const UploadButtons = styled(Button)`
margin: 15px;
`
const GreyText = styled.h6`
    color: grey;
    margin-left: 20px;
`

class Ingredients extends React.Component {
    renderCurrentIngredients = () => {
        const ingredients = this.props.ingredients

        if (ingredients.length === 0) {
            return (
                <Row>
                    <GreyText>Oops, your fridge is empty!</GreyText>
                </Row>
            )
        }
        return (
            <Row>
                {ingredients.map((ingredient) => {
                    return (
                        <Row>
                            <Col lg={3}>
                                <UploadButtons variant="Light" key={ingredient.ingredientName}>{ingredient.ingredientName}</UploadButtons>
                            </Col>
                        </Row>
                    )
                })}
            </Row>
        )
    }

    addIngredient = (event) => {
        event.preventDefault()
        this.props.addIngredientsFromText(this.textInputAdd.value)
        this.sendThru()
    }

    deleteIngredient = (event) => {
        event.preventDefault()
        this.props.deleteIngredients(this.textInputDelete.value)
        this.sendThru()
    }

    sendThru() {
        this.textInputAdd.value = "";
        this.textInputDelete.value = "";
    }

    render() {
        const currentIngredients = this.renderCurrentIngredients()
        return (
            <div>
                <Container>
                    <h4>Currently in the fridge!</h4>
                    {currentIngredients}
                    <InputGroup className="mb-3" onSubmit={this.addIngredient}>
                        <FormControl
                            placeholder=""
                            aria-label=""
                            aria-describedby="basic-addon2"
                            ref={(inputAdd) => this.textInputAdd = inputAdd}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={this.addIngredient}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className="mb-3" onSubmit={this.deleteIngredient}>
                        <FormControl
                            placeholder=""
                            aria-label=""
                            aria-describedby="basic-addon2"
                            ref={(inputDelete) => this.textInputDelete = inputDelete}
                        />
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={this.deleteIngredient}>Delete</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Container>
            </div >
        );
    }
}

export default Ingredients;