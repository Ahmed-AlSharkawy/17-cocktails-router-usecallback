import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()

  const searchInput = React.useRef('')

  const setSearch = () => {
    setSearchTerm(searchInput.current.value)
  }

  const handleSubmit = (e) => e.preventDefault()

  React.useEffect(() => {
    searchInput.current.focus()
  }, [])

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search your favorite cocktail</label>
          <h6
            style={{
              letterSpacing: '0.05rem',
              marginTop: '-1rem',
              marginLeft: '1rem',
              color: 'red',
            }}
          >
            Non Alcoholic
          </h6>
          <input type='text' id='name' onChange={setSearch} ref={searchInput} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
