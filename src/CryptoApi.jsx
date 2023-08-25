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
  const coinName = crypto?.data?.coins[0]?.name;
  const coinSymbol = crypto?.data?.coins[0]?.symbol;
  const coinPrice = crypto?.data?.coins[0]?.price;
  const cryptoCap = crypto?.data?.coins[0]?.marketCap;
  const volumeDay = crypto?.data?.coins[0]["24hVolume"];
  return (
    <div>
      <h1>{error}</h1>
      <h1>{coinName}</h1>
      <h1>{coinSymbol}</h1>
      <h1>${Math.floor(coinPrice).toLocaleString()}</h1>
      <h1>
        <h1>${Math.floor(cryptoCap).toLocaleString()}</h1>
      </h1>
      <h1>{Math.floor(volumeDay).toLocaleString()}</h1>
    </div>
  );
};

export default CryptoApi;
