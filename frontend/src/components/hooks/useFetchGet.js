import {useState, useEffect} from 'react'

export default function  useGetFetch(token) {
    const [ query, setQuery ] = useState([])
    
    useEffect(() => {
        fetch('https://hovify.herokuapp.com/api/v1/curriculum/', {
            headers: {
                'Authorization': token,
                'Content-Type' : 'application/json',
            }
        })
            .then(response => response.json()) 
            .then(data => setQuery(data))
    }, [])
    return query
}

export function useLoginApi( data ) {

    const [ query, setQuery ] = useState([])
    useEffect(() => {
            fetch('https://hovify.herokuapp.com/api/v1/login/', {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json()) 
        .then(data => setQuery(data))
    }, [])
    return query
}
