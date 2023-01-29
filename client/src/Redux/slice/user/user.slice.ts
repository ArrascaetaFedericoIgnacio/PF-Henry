import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../product/product.slice';

export interface userInterface {
  email: string;
  _id: string;
  role: string;
  firstName: string;
  lastName: string;
  email_verified: boolean;
  picture: string;
  username: string;
  connection: string;
  favorites: ProductState[];
}

export interface userChange {
  username: string;
  password: string;
}

const initialState: {
  userState: userInterface;
} = {
  userState: {
    connection: '',
    email: '',
    _id: '',
    role: 'user',
    firstName: '',
    lastName: '',
    email_verified: false,
    picture: '',
    username: '',
    favorites: [],
  },
};

const handleSaveLS = (user: userInterface) => {
  localStorage.setItem('userByBd', JSON.stringify(user));
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    getUserLogin: (state, action: PayloadAction<userInterface>) => {
      state.userState = action.payload;

      handleSaveLS(state.userState);
    },

    kevinPapitoMiAmor: (state, action: PayloadAction<userChange>) => {
      state.userState = { ...state.userState, ...action.payload };

      handleSaveLS(state.userState);
    },

    addFavorite: (state, action: PayloadAction<ProductState[]>) => {
      state.userState = {
        ...state.userState,
        favorites: action.payload,
      };

      handleSaveLS(state.userState);
    },
  },
});

export const { getUserLogin, kevinPapitoMiAmor, addFavorite } = userSlice.actions;
