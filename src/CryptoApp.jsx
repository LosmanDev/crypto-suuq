import { useState, useEffect } from 'react';
import "./App.css";
import CryptoApi from "./CryptoApi";

const CryptoApp = () => {
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const { crypto, error } = await CryptoApi();
      setCrypto(crypto);
      setError(error);
    };

    fetchCryptoData(); // Fetch data immediately

    const intervalId = setInterval(fetchCryptoData, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);
  

  return (
    <div className="animate-fadeIn">
      <h1 className="text-center text-5xl pb-3 pt-8 font-bold"> The Crypto Suuq</h1>
      <h1 className="text-center text-5xl pb-10 font-semibold">Track The Latest Prices</h1>
      <h1 className="text-center text-3xl pb-2 font-semibold">Total Market Cap </h1>
      <h1 className="text-center text-3xl pb-10 font-semibold">${Math.floor(crypto?.data?.stats?.totalMarketCap).toLocaleString()}</h1>
      
      <div className="flex -space-x-4 justify-center">
        <img className="w-auto h-12 object-cover animate-bounce" src="https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg" alt="Bitcoin" />
        <img className="w-auto h-12 object-cover animate-bounce" src="https://cdn.coinranking.com/rk4RKHOuW/eth.svg" alt="Ethereum" />
        <img className="w-auto h-12 object-cover animate-bounce" src="https://cdn.coinranking.com/B1N19L_dZ/bnb.svg" alt="Binance" />
        <img className="w-auto h-12 object-cover animate-bounce" src="https://cdn.coinranking.com/fiZ4HfnRR/shib.png" alt="Shiba Inu" />
        <img className="w-auto h-12 object-cover animate-bounce" src="https://cdn.coinranking.com/H1arXIuOZ/doge.svg" alt="Dogecoin" />
      </div>

    {error && <h1>{error}</h1>}
      {crypto && (
        <div className="p-5">
          <div className="overflow-x-auto">
           <table className="table-auto w-full" >
              <thead >
                <tr >
                  <th className="px-4 py-2 text-center font-bold text-2xl">Name</th>
                  <th className="px-4 py-2 text-center font-bold text-2xl">Symbol</th>
                  <th className="px-4 py-2 text-center font-bold text-2xl">Price</th>
                  <th className="px-4 py-2 text-center font-bold text-2xl">Market Cap</th>
                  <th className="px-4 py-2 text-center font-bold text-2xl">Volume</th>
                </tr>
              </thead>
              <tbody >
                {crypto.data.coins.map((coin, index) => (
                  <tr  key={index} className={index % 2 === 0 ? '#301E67' : ''}>
                    
                    <td className="border px-4 py-2 text-center text-xs sm:text-2xl flex flex-col items-center justify-center"><img src={coin.iconUrl} alt={coin.name} style={{width: '20px', height: '20px'}}/>{coin.symbol}</td>
                    <td className="border px-4 py-2 text-center text-xs sm:text-2xl">{coin.name}</td>
                    <td className="border px-4 py-2 text-center text-xs sm:text-2xl">${parseFloat(coin.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="border px-4 py-2 text-center text-xs sm:text-2xl">${Math.floor(coin.marketCap).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center text-xs sm:text-2xl">${Math.floor(coin["24hVolume"]).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default CryptoApp;