import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import styled from 'styled-components';

const Dropdown = styled(Accordion)`
border-radius: 20px;
border: none;
width: 100%;

&:hover {
    transform: scale(1.01);
}
`

const Cards = styled(Card)`
box-shadow: 5px 5px 15px #e8e8e8;
border-radius: 20px;
border: none;
width: 100%;

&:hover {
    transform: scale(1.01);
}
`

const List = styled.li`
list-style-type: none;
`

export default class RecipeCards extends React.Component {
    render() {
        const recipe = this.props.recipe

        return (
                <Dropdown>
                    <Cards>
                        <Accordion.Toggle as={Card.Body} eventKey="0">
                            <h5>{recipe.title}</h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h6>Ingredients: </h6>
                                <ul>
                                    {recipe.ingredients.map((direction) => {
                                        return (
                                            <li>{direction}</li>
                                        )
                                    })}
                                </ul>
                                <h6>Directions: </h6>
                                <ul>
                                    {recipe.directions.map((direction) => {
                                        return (
                                            <List>{direction}</List>
                                        )
                                    })}
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Cards>
                </Dropdown>
        )
    }
}