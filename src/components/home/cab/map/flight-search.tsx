"use client";

import { FC, useState, useEffect } from "react";
import Button from "@/components/common/btn";
import { Apply, Departure, From, Return, Search, SearchNow, To, Traveller } from "@/constant/constant";
import QtyBox from "@/components/common/booking-form/flight-form/qty-box";
import FlightClass from "@/components/common/booking-form/flight-form/flight-class";
import DatePickerComponent from "@/components/common/date-picker";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hooks";
import {  setFlights } from "@/redux-toolkit/reducers/filghtdata";
import { RootState } from "@/redux-toolkit/store";
interface City {
  id: string;
  type: string;
  code: string;
  name: string;
}

interface FlightSearchProps {
  title?: boolean;
}

const FlightSearch: FC<FlightSearchProps> = ({ title }) => {
  const data = useAppSelector((state: RootState) => state.flightdata);
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [traveller, setTraveller] = useState("1");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);
  const router = useRouter()
  const fetchCitySuggestions = async (term: string) => {
    try {
      const response = await fetch(`https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term=${term}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return [];
    }
  };

  useEffect(() => {
    if (fromValue) {
      fetchCitySuggestions(fromValue).then((suggestions) => setFromSuggestions(suggestions));
    }
  }, [fromValue]);

  useEffect(() => {
    if (toValue) {
      fetchCitySuggestions(toValue).then((suggestions) => setToSuggestions(suggestions));
    }
  }, [toValue]);

  const formatDate = (date:any) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };
  
  const handleSearchNow = async() => {
    // Gather the necessary information
    const searchData = {
      from: fromValue,
      to: toValue,
      departureDate: formatDate(startDate),
      returnDate: formatDate(startDate1),
      travelerCount: parseInt(traveller, 10),
    };
  
    // Validate the data
    if (!searchData.from || !searchData.to || !searchData.departureDate || !searchData.returnDate || isNaN(searchData.travelerCount)) {
      alert("Please provide all required information");
      return;
    }
    const apiUrl = '/api/flight';
    // Build the API URL with formatted dates
    // const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${searchData.from}&destination=${searchData.to}&departure_at=${searchData.departureDate}&return_at=${searchData.returnDate}&unique=false&sorting=price&direct=false&currency=usd&limit=30&page=1&one_way=true&token=d90f8a36616fc1c341f29c73938a3270`;
  
    // Call the API using fetch
       await axios.get(apiUrl, {
        params: {
          from: searchData.from,
          to: searchData.to,
          departureDate: searchData.departureDate,
          returnDate: searchData.returnDate,
        
        },
    }).then(response =>{
      if(response.data.data){
        if (response.data.data.length == 0) {
           alert("No Flight Available")
        }else{
          // console.log(response.data.data);
          dispatch(setFlights({flights:response.data.data}))
          // console.log(data);
          
          router.push("/en/flight/listing/left-sidebar")
        }
        
      }
    }).catch(()=>{
      alert("Somethig wrong Please try again")
    })
  
    
    
  };
  
  

  return (
    <div className="search-panel">
      {title && <h2 className="title-top">deals on every flight you book</h2>}
      <div className="search-section">
        <div className="search-box">
          <div className="left-part">
            <div className="search-body">
              <h6>{From}</h6>
              <input
                type="text"
                className="form-control open-select"
                value={fromValue}
                placeholder="from"
                onChange={(e) => {
                  const newValue = e.target.value;
                 
                  if (newValue !== toValue && newValue !== "") {
                    setFromValue(newValue);
                  }else{
                    setFromValue("");
                  }
                  
                }}
              />
              {fromSuggestions.length > 0 && (
                <ul>
                  {fromSuggestions.slice(0, 1).map((city) => (
                    <li style={{cursor:"pointer"}} key={city.id} onClick={() => {
                      if (city.code !== toValue) {
                        setFromValue(city.code);
                      }
                    }}>
                      {city.name} ({city.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="search-body">
              <h6>{To}</h6>
              <input
                type="text"
                className="form-control open-select"
                value={toValue}
                placeholder="to"
                onChange={(e) => {
                  const newValue = e.target.value;
                  
                  if (newValue !== fromValue && newValue !== "") {
                    setToValue(newValue);
                  }else{
                    setToValue("");
                  }
                
                }}
              />
              {toSuggestions.length > 0 && (
                <ul>
                  {toSuggestions.slice(0, 1).map((city) => (
                    <li style={{cursor:"pointer"}} key={city.id} onClick={() => {
                      if (city.code !== fromValue) {
                        setToValue(city.code);
                      }
                    }}>
                    
                      {city.name} ({city.code})
                    </li>
                     
                  ))}
                </ul>
              )}
            </div>
            <div className="search-body">
              <h6>{Departure}</h6>
              <DatePickerComponent start={startDate} setStart={setStartDate} />
            </div>
            <div className="search-body">
              <h6>{Return}</h6>
              <DatePickerComponent start={startDate1} setStart={setStartDate1} />
            </div>
            <div className="search-body">
              <h6>{Traveller}</h6>
              <input type="number" className="form-control  open-select" value={traveller} onChange={ e=> setTraveller(e.target.value)} placeholder="Enter Traveller" />
              <div className="selector-box-flight">
                <QtyBox />
                <FlightClass />
                <div className="bottom-part">
                  <Button btnClass="btn" name={Apply} />
                </div>
              </div>
            </div>
            <div className="search-body btn-search">
              <div className="right-part">
              <div
              className="btn btn-solid color1"
              style={{ cursor: "pointer" }}
              onClick={handleSearchNow}
            >
              {SearchNow}
            </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
