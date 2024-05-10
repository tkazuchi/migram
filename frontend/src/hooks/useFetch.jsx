import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(endpoint) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/${endpoint}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);

      });
  }, [endpoint]);

  return {
    items,
    error
  };
}

export default useFetch;
