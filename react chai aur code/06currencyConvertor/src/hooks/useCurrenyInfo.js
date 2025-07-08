import { useEffect,useState } from "react";

function useCurrencyInfo(currency) { 
    const [currencyInfo, setCurrencyInfo] = useState({});
        useEffect(() =>{
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
            .then((response) => response.json())
            .then((data)=>setCurrencyInfo(data[currency]))
            console.log(currencyInfo)
        },[currency])
    return currencyInfo
}
export default useCurrencyInfo;
// This custom hook fetches currency information based on the provided currency code.
// It uses the useEffect hook to make an API call to a currency API and updates the state with the fetched data.
// The fetched data is then returned as currencyInfo.
// The useEffect hook is triggered whenever the currency code changes, ensuring that the latest information is retrieved.   