import React, { useState, useContext, useEffect, useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()

      if (data.drinks) {
        const nonAlcholics = data.drinks.filter(
          (item) => item.strAlcoholic === 'Non alcoholic'
        )

        if (nonAlcholics.length > 0) {
          console.log(nonAlcholics)
          const newCocktails = nonAlcholics.map((item) => {
            const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
              item
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            }
          })
          setCocktails(newCocktails)
        } else {
          setCocktails([])
        }
      } else {
        setCocktails([])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks])

  return (
    <AppContext.Provider value={{ isLoading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
