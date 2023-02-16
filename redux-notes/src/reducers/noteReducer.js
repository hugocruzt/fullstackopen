import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

// const initialState = {
//   notes: [
//     {
//       content: "reducer defines how redux store works",
//       important: true,
//       id: 1,
//     },
//     { content: "state of store can contain any data", important: false, id: 2 },
//   ],
//   filter: "IMPORTANT",
// };

// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

// const noteReducer = (state = initialState.notes, action) => {
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.data];
//     case "TOGGLE_IMPORTANCE": {
//       const id = action.data.id;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     }
//     default:
//       return state;
//   }
// };

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   const newNote = action.payload;
    //   state.push(newNote);
    //   //const content = action.payload;
    //   // state.push({
    //   //   content,
    //   //   important: false,
    //   //   id: generateId(),
    //   // });
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;