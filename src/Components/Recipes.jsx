import React from 'react';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import RecipeCards from './RecipeCards'

const ExperienceCards = styled(Col)`
    display: flex;
    padding-bottom: 20px;
`

const UploadButtons = styled(Button)`
margin: 15px;
`

const GreyText = styled.h6`
    color: grey;
    margin-left: 20px;
    padding-bottom: 15%;
`

const Subtitle = styled.h5`
    margin: 20px;
`

const DarkerSection = styled.div`
background-color: #f3f7f9;
padding-bottom: 5%;
margin-bottom: 15px;
`

class Experience extends React.Component {
    sortRecipesByPercentageMatch = (recipes) => {
        const matchedRecipes = []
        const notFullyMatchedRecipes = []

        recipes.forEach((recipe) => {
            if (recipe.percentageMatch === 1) {
                matchedRecipes.push(recipe)
            } else {
                notFullyMatchedRecipes.push(recipe)
            }
        })

        return this.renderRecipesByCategory(matchedRecipes, notFullyMatchedRecipes)
    }

    renderRecipesByCategory = (matchedRecipes, notFullyMatchedRecipes) => {
        if (matchedRecipes.length === 0) {
            return (
                <Container>
                    <Row>
                        <Subtitle>Full Matches</Subtitle>
                        <p>Oops! It seems like you dont have enough food for anything :(</p>
                    </Row>
                    <Row>
                        <Subtitle>Similar to your pantry</Subtitle>
                    </Row>
                    <Row>
                        {notFullyMatchedRecipes.map((recipe) => {
                            return (
                                <ExperienceCards lg={4}>
                                    <RecipeCards
                                        key={recipe.title}
                                        recipe={recipe}
                                    />
                                </ExperienceCards>
                            )
                        })}
                    </Row>
                </Container>
            )
        }
        return (
            <Container>
                <Row>
                    <Subtitle>Full Matches</Subtitle>
                </Row>
                <Row>
                    {matchedRecipes.map((recipe) => {
                        return (
                            <ExperienceCards lg={4}>
                                <RecipeCards
                                    key={recipe.title}
                                    recipe={recipe}
                                />
                            </ExperienceCards>
                        )
                    })}
                </Row>
                <Row>
                    <Subtitle>Similar to your pantry</Subtitle>
                </Row>
                <Row>
                    {notFullyMatchedRecipes.map((recipe) => {
                        return (
                            <ExperienceCards lg={4}>
                                <RecipeCards
                                    key={recipe.title}
                                    recipe={recipe}
                                />
                            </ExperienceCards>
                        )
                    })}
                </Row>
            </Container>
        )
    }

    renderRecipes = () => {
        const recipes = this.props.recipes

        if (recipes.length === 0) {
            return (
                <div>
                    <Container>
                        <Row>
                            <GreyText>No recipes currently retreived</GreyText>
                        </Row>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                {this.sortRecipesByPercentageMatch(recipes)}
            </div>
        )
    }

    renderSpinner = () => {
        if (this.props.isLoading) {
            return (
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
    }

    render() {
        return (
            <DarkerSection>
                <Container>
                    <UploadButtons variant="info" onClick={this.props.retrieveRecipes}>Get Recipes</UploadButtons>
                    {this.renderSpinner()}
                    {this.renderRecipes()}
                </Container>
            </DarkerSection>
        );
    }
}

export default Experience;