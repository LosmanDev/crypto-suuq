import { useState, useEffect } from 'react';
import './App.css';
import Lottie from 'lottie-react';
import animationData from '../src/assets/animation_lmwmr9lq.json';
import CryptoApi from './CryptoApi';

const CryptoApp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
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
      <div className="flex flex-col items-center justify-center shadow-xl shadow-secondary rounded">
        <h1 className="text-center sm:text-5xl text-3xl pt-20 pb-5 font-bold">
          The Crypto <span className="text-secondary">Suuq</span>
        </h1>
        <h1 className="text-center sm:text-3xl text-2xl pb-5 font-semibold">
          Track The <span className="text-secondary">Latest</span> Prices
        </h1>
        <h1 className="text-center sm:text-2xl text-lg pb-2 font-semibold">
          Total <span className="text-secondary">Market</span> Cap
        </h1>
        <h1 className="text-center sm:text-2xl text-lg  font-semibold">
          ${Math.floor(crypto?.data?.stats?.totalMarketCap).toLocaleString()}
        </h1>

        <div className="flex justify-center sm:w-80 w-44 ">
          <Lottie animationData={animationData} options={defaultOptions} />
        </div>
      </div>

      {error && <h1>{error}</h1>}
      {crypto && (
        <div className="overflow-x-auto pt-10 px-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="sm:text-2xl text-lg font-medium text-primary px-4">
                  Name
                </th>

                <th className="sm:text-2xl text-lg font-medium text-primary px-4">
                  Price
                </th>

                <th className="sm:text-2xl text-lg font-medium text-primary px-4">
                  Market Cap
                </th>
                <th className="sm:text-2xl text-lg font-medium text-primary px-4">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {crypto.data.coins.map((coin, index) => (
                <tr key={index} className={index % 2 == 0 ? '#03001C' : ''}>
                  <td className=" py-2 text-xs sm:text-2xl flex flex-col ">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div>
                          <img
                            src={coin.iconUrl}
                            alt={coin.name}
                            style={{ width: '30px', height: '30px' }}
                            className="animate-slideIn"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold animate-slideIn">
                          {coin.symbol}
                        </div>
                        <div className="text-sm font-normal opacity-50 animate-slideIn">
                          {coin.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2 text-xs sm:text-2xl animate-slideIn">
                    $
                    {parseFloat(coin.price).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <div
                      className={`px-4 py-2 text-xs sm:text-sm animate-slideIn ${
                        coin.change.toString().includes('-')
                          ? 'text-error'
                          : 'text-success'
                      }`}
                    >
                      {coin.change.toString().includes('-')
                        ? coin.change
                        : `+${coin.change}`}
                    </div>
                  </td>

                  <td className="px-4 py-2 text-xs sm:text-2xl animate-slideIn">
                    ${Math.floor(coin.marketCap).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-xs sm:text-2xl animate-slideIn">
                    ${Math.floor(coin['24hVolume']).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoApp;
