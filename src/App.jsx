import { useState } from 'react'
import useFetchBooksApi from './hooks/useFetchBooksApi';
import {debounce} from './utils';

function App() {
  const { books, isLoading, setIsLoading, hasMore, setQuery, setPage } = useFetchBooksApi('',1);
  function handleChange(e){
    const query = e.target.value;
    setQuery(query);
    setIsLoading(true);
    setPage(1);
  }
  return (
    <>
      <input type="text" className='searchbar' onChange={debounce(handleChange,1000)} />
    {isLoading && <div className="loader">...Loading</div>}
      <ul>
        { 
          books?.map((book, index, books) => {
            // if(books.length === index+1) 
            //   return <li key={index}>{book.title}</li>
            return <li key={index}>{book.title}</li>
          })
        }
      </ul>
    </>
  )
}

export default App
