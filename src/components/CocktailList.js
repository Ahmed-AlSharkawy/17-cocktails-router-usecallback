import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const { isLoading, cocktails } = useGlobalContext()

  if (isLoading) return <Loading />
  else if (cocktails.length < 1)
    return (
      <h2 className='section-title' style={{ marginTop: '3rem' }}>
        no non-alcoholic cocktails matched your search criteria
      </h2>
    )

  console.log(cocktails)
  return (
    <section className='section'>
      <h2 className='section-title'>non-alcoholic cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
