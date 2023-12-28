import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFlightDataReducerProps {
  flights: Array<any> | null | undefined; // Change 'data' to 'flights'
}

const initialState: IFlightDataReducerProps = {
  flights: [], // Change 'data' to 'flights'
};

const flightDataSlice = createSlice({
  name: 'flightData', // Change 'flight' to 'flightData'
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<IFlightDataReducerProps>) => {
      const { flights } = action.payload; // Change 'data' to 'flights'
      state.flights = flights; // Change 'data' to 'flights'
    },
  },
});

export const { setFlights } = flightDataSlice.actions; // Change 'setData' to 'setFlights'
export const flightDataReducer = flightDataSlice.reducer; // Change 'flightdataReducer' to 'flightDataReducer'
