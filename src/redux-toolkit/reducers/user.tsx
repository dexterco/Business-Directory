import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserReducerProps {
  uid: string | null | undefined;
  displayName: string | null | undefined;
  email: string | null | undefined;
}

const initialState: IUserReducerProps = {
  uid: null,
  displayName: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserReducerProps>) => {
      const { uid, displayName, email } = action.payload;
      state.uid = uid;
      state.displayName = displayName;
      state.email = email;
    },
    clearUser: (state) => {
      state.uid = null;
      state.displayName = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
