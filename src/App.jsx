import { useRef, useState, useEffect } from 'react'
import useFetchBooksApi from './hooks/useFetchBooksApi';
import {debounce} from './utils';
import Modal from './components/Modal';
import {Button} from './components/styledComponents.js';

function App() {
  const { books, isLoading, setQuery, setPage } = useFetchBooksApi('');
  const endOfList = useRef(null);
  const lastBookObserver = useRef(null);
  const [modalVisibility, setModalVisibility] = useState(false);
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
      <Button type="button"
        onClick={()=>setModalVisibility(true)}
      >Open Modal</Button>
      { modalVisibility && <Modal setModalVisibility={setModalVisibility}/> }
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
