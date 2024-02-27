import {useState, useEffect} from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  bio: string;
  user:{
    image:string;
  }
  coverPhoto:string;
}

const useFetch = (url:string) => {
    const [item, setData] = useState<User>();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const user = await axios.get<User>(url);
          setData(user.data)
        } catch (error) {
          setLoading(false);
        }
      }
      fetchData();
    }, [url]);
  
    return { item , loading ,error };
  };
  
  export default useFetch;