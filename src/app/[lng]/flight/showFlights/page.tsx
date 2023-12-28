// Import necessary dependencies and components
'use client'
import { FC, useState } from "react";
import Link from "next/link";
import Button from "@/components/common/btn";

interface IFlightProps {
  flight_number: string;
  link: string;
  origin_airport: string;
  destination_airport: string;
  departure_at: string;
  airline: string;
  destination: string;
  return_at: string;
  origin: string;
  price: number;
  return_transfers: number;
  duration: number;
  duration_to: number;
  duration_back: number;
  transfers: number;
}

const DetailBar: FC= () => {
    const data = [
      {
        "flight_number": "0018",
        "link": "/search/DOH0201MEL03011?t=EK17042040001704284400001340DOHDXBMEL17043093001704387900001310MELDXBDOH_4d5b8d16c417daa6f3cc33f219806595_209277&search_date=25122023&expected_price_uuid=7b0197e0-da00-47b3-8db7-045c29dcaa91&expected_price_source=share&expected_price_currency=usd&expected_price=2275",
        "origin_airport": "DOH",
        "destination_airport": "MEL",
        "departure_at": "2024-01-02T17:00:00+03:00",
        "airline": "FZ",
        "destination": "MEL",
        "return_at": "2024-01-04T06:15:00+11:00",
        "origin": "DOH",
        "price": 2275,
        "return_transfers": 1,
        "duration": 2650,
        "duration_to": 875,
        "duration_back": 910,
        "transfers": 1
      }
    ]
  
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleDetailWrapClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className="detail-bar">
      {data?.map((item: IFlightProps, index: number) => (
        <div
          className={`detail-wrap wow fadeInUp ${activeItem === index ? "active" : ""}`}
          key={index}
          onClick={() => handleDetailWrapClick(index)}
        >
          <div className="row">
            <div className="col-md-2">
              <div className="logo-sec">
                <span className="title">{item.airline}</span>
              </div>
            </div>
            <div className="col-md-5">
              <div className="airport-part">
                <div className="airport-name">
                  <h4>{item.departure_at}</h4>
                  <h6>{item.origin_airport}</h6>
                </div>
                <div className="airport-progress">
                  <i className="fas fa-plane-departure float-start"></i>
                  <i className="fas fa-plane-arrival float-end"></i>
                  <div className="stop">{item.transfers}</div>
                </div>
                <div className="airport-name arrival">
                  <h4>{item.return_at}</h4>
                  <h6>{item.destination_airport}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="price">
                <div>
                  <h4>
                   
                    {(item.price).toFixed(2)}
                  </h4>
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="book-flight">
                <Link href={item.link}>
                  <Button btnClass="btn btn-solid color1" name="Book Now" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailBar;
