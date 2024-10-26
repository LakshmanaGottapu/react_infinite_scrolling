import {useEffect, useState, useRef} from 'react'

function useFetchBooksApi(q, p) {
    const [query, setQuery] = useState(q);
    const [page, setPage] = useState(p);
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const controller = useRef(null);
    
    const baseURL = "https://openlibrary.org/search.json";
    const params = {
        q: query,
        page
    }
    const url = new URL(baseURL);
    url.search = new URLSearchParams(params).toString();
    async function fetchBooks(signal){
        let response;
        if(!query)
            return null;
        response = await fetch(url,{signal})
        return await response.json();
    }
    useEffect(()=>{
        controller.current = new AbortController();
        if(query){
            (async ()=>{
                const json = await fetchBooks(controller.current.signal);
                console.log(json.docs);
                if(json){
                    setIsLoading(false);
                    setBooks(oldBooks => [...oldBooks, ...[...new Set(json.docs)]]);
                }
            })()
        }
        return () => controller.current.abort();
    },[query, page]);

    return { books, isLoading, setIsLoading, setQuery, setPage };
}

export default useFetchBooksApi
