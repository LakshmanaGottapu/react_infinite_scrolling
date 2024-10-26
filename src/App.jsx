import { useRef, useState, useEffect } from 'react'
import useFetchBooksApi from './hooks/useFetchBooksApi';
import {debounce} from './utils';

function App() {
  const { query, page, books, isLoading, setQuery, setIsLoading, setPage } = useFetchBooksApi('');
  const endOfList = useRef(null);
  const lastBookObserver = useRef(null);
  useEffect(()=>{
    lastBookObserver.current = new IntersectionObserver(entries => {
      console.log(entries)
      const lastBook = entries[0];
      if(!lastBook.isIntersecting) return;
      setPage(page => page+1)
    },{
        threshold: 1,
    })
    lastBookObserver.current.observe(endOfList.current);
    return () => lastBookObserver.current.disconnect();
  }, [])
  
  function handleChange(e){
    const query = e.target.value;
    setQuery(query);
    setPage(1);
  }
  return (
    <>
      <input type="text" className='searchbar' onChange={debounce(handleChange,1000)} />
      <ul>
        { 
          books?.map((book, index, books) => {
            return <li key={index}>{book.title}</li>
          })
        }
      </ul>
      <div ref={endOfList} style={{height:'20px', backgroundColor:'red'}} className="loader">{isLoading?"...Loading":""}</div>
    </>
  )
}

export default App
