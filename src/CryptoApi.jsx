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
  const coinName1 = crypto?.data?.coins[0]?.name;
  const coinSymbol1 = crypto?.data?.coins[0]?.symbol;
  const coinPrice1 = crypto?.data?.coins[0]?.price;
  const cryptoCap1 = crypto?.data?.coins[0]?.marketCap;
  const volumeDay1 = crypto?.data?.coins[0]["24hVolume"];

  return (
    <div>
      <div className="p-5">
        <h1>{error}</h1>
        <h1>{coinName1}</h1>
        <h1>{coinSymbol1}</h1>
        <h1>${Math.floor(coinPrice1).toLocaleString()}</h1>
        <h1>${Math.floor(cryptoCap1).toLocaleString()}</h1>
        <h1>Volume {Math.floor(volumeDay1).toLocaleString()}</h1>
      </div>
    </div>
  );
};

export default CryptoApi;
