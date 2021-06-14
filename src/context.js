import React, { useState, useContext, useEffect, useCallback } from 'react'

// const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const nonAlcoholicURL =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails] = useState([])

  /* using two api's 
  // search api that needs alcoholic filtering
  // filter api for all non alcoholic items

  const fetchDrinks = useCallback(async () => {
    try {
      if (searchTerm) {
        setIsLoading(true)
        const response = await fetch(`${searchURL}${searchTerm}`)
        const data = await response.json()

        if (data.drinks) {
          const nonAlcholics = data.drinks.filter(
            (item) => item.strAlcoholic === 'Non alcoholic'
          )

          if (nonAlcholics.length > 0) {
            console.log(nonAlcholics)
            const newCocktails = nonAlcholics.map((item) => {
              const {
                idDrink,
                strDrink,
                strDrinkThumb,
                strAlcoholic,
                strGlass,
              } = item
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
      }

      // let url = searchTerm ? `${searchURL}${searchTerm}` : nonAlcoholicURL
      else {
        setIsLoading(true)
        const response = await fetch(nonAlcoholicURL)
        const data = await response.json()

        if (data.drinks) {
          const newCocktails = data.drinks.map((item) => {
            const { idDrink, strDrink, strDrinkThumb, strGlass } = item
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: 'Non Alcoholic',
              glass: strGlass,
            }
          })
          setCocktails(newCocktails)
        } else {
          setCocktails([])
        }
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm, fetchDrinks]) */

  /* using one api
  // non alcoholic api 
  */
  const fetchDrinks = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(nonAlcoholicURL)
      const data = await response.json()

      if (data.drinks) {
        setCocktailsState(
          searchTerm
            ? data.drinks.filter((item) =>
                item.strDrink.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : data.drinks
        )
      } else {
        setCocktails([])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [searchTerm])

  const setCocktailsState = (dataArray) => {
    if (dataArray.length > 0) {
      const newCocktails = dataArray.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strGlass } = item
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: 'Non Alcoholic',
          glass: strGlass,
        }
      })
      setCocktails(newCocktails)
    } else setCocktails([])
  }

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
