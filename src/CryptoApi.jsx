const CryptoApi = async () => {
  try {
    const response = await fetch("https://api.coinranking.com/v2/coins");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { crypto: data, error: null };
  } catch (error) {
    return { crypto: null, error: "An error occurred while fetching data" };
  }
};

export default CryptoApi;
