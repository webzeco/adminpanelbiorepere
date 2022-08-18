import { useState } from 'react';

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    await setData(response.data);
    console.log(response.data);
    setLoading(false);
    setError(!response.ok);
    return response;
  };

  return { data, error, loading, request };
}
