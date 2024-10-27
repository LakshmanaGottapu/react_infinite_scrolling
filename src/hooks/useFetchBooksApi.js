import {useEffect, useState, useRef} from 'react'

function useFetchBooksApi(q) {
    const [query, setQuery] = useState(q);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const controller = useRef(null);
    
    async function fetchBooks(signal){
        const baseURL = "https://openlibrary.org/search.json";
        const params = {
            q: query,
            page
        }
        const url = new URL(baseURL);
        url.search = new URLSearchParams(params).toString();
        let response;
        if(!query)
            return null;
        response = await fetch(url,{signal})
        return await response.json();
    }
    useEffect(()=>{
        controller.current = new AbortController();
        if(query){
            setIsLoading(true);
            (async ()=>{
                const json = await fetchBooks(controller.current.signal);
                // console.log(json.docs);
                if(json.docs.length>0){
                    const newBooks = page===1 ? [...new Set(json.docs)] : [...books, ...[...new Set(json.docs)]];
                    setBooks(newBooks);
                }
                else{
                    setIsLoading(false);
                }
            })()
        }
        return () => controller.current.abort();
    },[query, page]);

    return { books, isLoading, setIsLoading, query, setQuery, setPage, page };
}

export default useFetchBooksApi
