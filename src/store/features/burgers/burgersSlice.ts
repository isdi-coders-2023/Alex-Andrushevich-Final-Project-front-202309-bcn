import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BurgersStateStructure, type MongooseBurgerStructure } from "./types";

export const initialBurgersState: BurgersStateStructure = {
  burgers: [],
  selectedBurger: {} as MongooseBurgerStructure,
};

const burgersSlice = createSlice({
  name: "burgersState",

  initialState: initialBurgersState,

  reducers: {
    loadBurgers: (
      currentState,
      action: PayloadAction<MongooseBurgerStructure[]>,
    ) => ({
      ...currentState,
      burgers: action.payload,
    }),
    deleteBurger: (
      currentState,
      action: PayloadAction<string>,
    ): BurgersStateStructure => {
      const burgerId = action.payload;
      return {
        ...currentState,
        burgers: currentState.burgers.filter(
          (burger) => burgerId != burger._id,
        ),
      };
    },
    addBurger: (
      currentState,
      action: PayloadAction<MongooseBurgerStructure>,
    ): BurgersStateStructure => {
      const newBurger = action.payload;
      return {
        ...currentState,
        selectedBurger: newBurger,
      };
    },
    getBurgerById: (
      currentState,
      action: PayloadAction<string>,
    ): BurgersStateStructure => {
      const requestedBurger = currentState.burgers.filter((burger) => {
        return burger._id === action.payload;
      });
      return { ...currentState, selectedBurger: requestedBurger[0] };
    },
    loadBurger: (
      currentState,
      action: PayloadAction<MongooseBurgerStructure>,
    ): BurgersStateStructure => {
      return { ...currentState, selectedBurger: action.payload };
    },
    modifyBurger: (
      currentState,
      action: PayloadAction<MongooseBurgerStructure>,
    ): BurgersStateStructure => {
      const allOtherBurgers = currentState.burgers.filter((burger) => {
        return burger._id != action.payload._id;
      });
      return {
        ...currentState,
        burgers: [...allOtherBurgers, action.payload],
      };
    },
  },
});

export default burgersSlice.reducer;

export const {
  loadBurgers: loadBurgersActionCreator,
  deleteBurger: deleteBurgerActionCreator,
  addBurger: addBurgerActionCreator,
  getBurgerById: getBurgerByIdActionCreator,
  loadBurger: loadBurgerActionCreator,
  modifyBurger: modifyBurgerActionCreator,
} = burgersSlice.actions;
