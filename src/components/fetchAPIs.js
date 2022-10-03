const fetchAPIs = async (url, search) => {
  const res = await fetch(`https://api.coincap.io/v2/assets`);
  const data = await res.json();

  return data;
};

export default fetchAPIs;
