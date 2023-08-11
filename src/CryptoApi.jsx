import { useState, useEffect } from "react";

const CryptoApi = () => {
  const [crypto, setCrypto] = useState();
  const [error, setError] = useState(null);
  const apiKey = "262d8f68-8d9e-4a36-b8df-66f2740a5476";
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY =" +
            apiKey
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        setError("An error occurred while fetching data");
      }
    };
    getData();
  }, [crypto]);

  return (
    <div>{error ? <p>{error}</p> : <pre>{JSON.stringify(crypto)}</pre>}</div>
  );
};

export default CryptoApi;
