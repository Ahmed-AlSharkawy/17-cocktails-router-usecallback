import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()

  const [isLoading, setIsLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  React.useEffect(() => {
    setIsLoading(true)
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const Ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            Ingredients,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
        setIsLoading(false)
      } catch (error) {
        console.log('error')
        // setCocktail(null)
        setIsLoading(false)
      }
    }
    getCocktail()
  }, [id])

  if (isLoading) return <Loading />
  else if (!cocktail) {
    return (
      <section className='section'>
        <div className='error-container'>
          <h2 className='section-title'>Wrong Item</h2>
          <Link className='btn btn-primary' to='/'>
            Back Home
          </Link>
        </div>
      </section>
    )
  }
  const { name, image, info, category, glass, instructions, Ingredients } =
    cocktail
  return (
    <section className='section cocktail-section'>
      <Link className='btn btn-primary' to='/'>
        Back Home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {Ingredients.map((item, index) => {
              return item ? <span key={index}>{item} </span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
