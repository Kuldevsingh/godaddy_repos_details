import { useState, useEffect } from 'react';

const useFetchGoDaddyRepos = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Added timer to show loader on UI 
    const timer = setTimeout(async() => {
      try{
      const response = await fetch(url);
      const repos = await response.json();
      setData(repos)
      setLoading(false);
      }
      catch(error){
        setLoading(false)
        setData([])
        console.error(error)  
        // Error can catch here and can be handled by error bounderies.
      }
     finally{
      setLoading(false)
     }
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  return { data, loading };
};

export default useFetchGoDaddyRepos;
