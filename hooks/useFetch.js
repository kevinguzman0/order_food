import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    
    const fetchData = async () => {
        const res = await fetch(url)
        const d = await res.json()
        setData(d)
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return { loading, data }
}

export default useFetch