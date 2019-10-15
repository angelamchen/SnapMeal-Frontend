import React from 'react';
import './App.css';
import Navbar from './Components/Navbar.jsx';
import MastHead from './Components/Masthead.jsx';
import axios from 'axios';
import Recipes from './Components/Recipes'
import Ingredients from './Components/Ingredients'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "selectedFile": null,
      "currentFileName": null,
      "showSendButton": false,
      "imgUpload": null,
      "isLoading": false,
      "recipes": [],
      "currentIngredients": [],
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
  }

  componentDidMount() {
    this.fetchUserIngredients()
  }

  fetchUserRecipes = async () => {
    this.setState({
      isLoading: true
    })

    try {
      const response = await axios.get(`http://99.79.93.113:8080/api/recipes/angelachen`)
      this.setState({
        recipes: response.data,
        isLoading: false
      })
    } catch (e) {
      this.setState({
        isLoading: false
      })
    }
  }

  fetchUserIngredients = async () => {
    const response = await axios.get(`http://99.79.93.113:8080/ingredients/UserIngredient?userId=angelachen`)

    this.setState({
      currentIngredients: response.data
    })
  }

  addIngredientsFromImage = async (imgUpload) => {
    this.setState({
      isLoading: true
    })
    await axios.post(`http://99.79.93.113:8080/ingredients/angelachen`, { imageString: imgUpload })
    this.setState({
      isLoading: false
    })
    this.fetchUserIngredients()
  }

  addIngredientsFromText = async (ingredientName) => {
    await axios.post(`http://99.79.93.113:8080/ingredients/${ingredientName}/angelachen`)
    this.fetchUserIngredients()
  }

  deleteIngredients = async (ingredientName) => {
    await axios.delete(`http://99.79.93.113:8080/ingredients/${ingredientName}/angelachen`)
    this.fetchUserIngredients()
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      currentFileName: event.target.files[0].name,
      showSendButton: true
    })
  }

  fileUploadHandler = () => {
    let reader = new FileReader()
    reader.readAsDataURL(this.state.selectedFile)
    reader.onload = async () => {
      const encodedImg = reader.result.replace("data:image/jpeg;base64,", "")
      this.setState({
        imgUpload: encodedImg
      });
      await this.addIngredientsFromImage(this.state.imgUpload)
    }

    this.setState({
      showSendButton: false,
      currentFileName: ""
    })
  }

  render() {
    return (
      <span>
        <Navbar />
        <div>
          <MastHead
            showSendButton={this.state.showSendButton}
            uploadedFile={this.state.currentFileName}
            fileUploadHandler={this.fileUploadHandler}
            fileSelectedHandler={this.fileSelectedHandler}
            darkTitle={'WELCOME TO'}
            blueTitle={'SNAPMEAL'}
            description={'Don\'t know what to make for dinner? Well don\'t worry! Just take a picture of your fridge and Snapmeal will recommend a recipe based on what you have!'}
          />
          <Ingredients
            ingredients={this.state.currentIngredients}
            addIngredientsFromText={this.addIngredientsFromText}
            deleteIngredients={this.deleteIngredients}
          />
          <Recipes
            recipes={this.state.recipes}
            retrieveRecipes={this.fetchUserRecipes}
            isLoading={this.state.isLoading}
          />
        </div>
      </span>
    )
  }
}

export default App;
