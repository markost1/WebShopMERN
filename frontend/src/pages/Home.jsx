import {useEffect, useState } from "react"
import axios from 'axios'


export default function Home() {

  const[products,setProducts] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get("http://localhost:3000/api/products")
        setProducts(response.data);
        
      } catch (error) {
        console.log("Error in fetching data",error);
        
      }
      
    }

    fetchData()
    

  },[])  


    console.log(products)

  return (
    <h1 className="text-3xl text-red-500">Home Page</h1>
  )
}
