import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

// ======================= Get data from LocalStorage ================//
let items =
  localStorage.getItem("savedItems") !== null
    ? JSON.parse(localStorage.getItem("savedItems"))
    : [];

//================= setup project global state=================//
const initialState = {
  value: items,
  count: items.length,
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    // =============== Handle add function ==============//
    addItem: (state, action) => {
      // =============== vheck for duplicate ==============//
      let dup = false;
      state.value.map((e) => {
        e.id == action.payload.id ? (dup = true) : "";
      });
      if (dup) return "";
      // =============== add Element to state ==============//
      state.value.unshift({
        id: action.payload.id,
        quote: action.payload.quote,
      });
      // =============== Add the changes to localStorage ==============//
      localStorage.setItem("savedItems", JSON.stringify([...state.value]));
      state.count = state.value.length;
    },
    // =============== Handle delete function ==============//
    deleteItem: (state, action) => {
      // =============== delete item using filter ==============//
      let arr = state.value.filter((el) => {
        return el.id != action.payload.id;
      });
      state.value = arr;
      // =============== Add the changes to localStorage ==============//
      localStorage.setItem("savedItems", JSON.stringify([...state.value]));
      state.count = state.value.length;
    },
  },
});

// =============== Export actions ==============//
export const { addItem, deleteItem } = quotesSlice.actions;
// =============== Export Reducer ==============//
export default quotesSlice.reducer;
