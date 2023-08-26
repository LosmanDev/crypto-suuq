import { useState, useEffect } from "react";

const CryptoApi = () => {
  const [crypto, setCrypto] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://api.coinranking.com/v2/coins");

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
  }, []);

  return { crypto, error };
};

export default CryptoApi;