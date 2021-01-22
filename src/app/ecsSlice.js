import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

export const AsyncThunkgetBookInfoFromAPI = createAsyncThunk('bookStore/AsyncThunkgetBookInfoFromAPI', async (_, thunkAPI) => {
    // console.log(thunkAPI.getState());
    return fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json')
    .then(r => r.json())
    .then(data => {
        return data;
    });
});


export const AsyncThunkSearch = createAsyncThunk('bookStore/AsyncThunkSearch', async (query, thunkAPI) => {
    console.log(query);
    return thunkAPI.getState().bookStore.bookStore.filter(book => {
        return book.title.toString().indexOf(query) > -1;
    })
})

export const AsyncThunkSortWithRating = createAsyncThunk('bookStore/AsyncThunkSortWithRating', async (params, thunkAPI) => {
    console.log(params);
    if(params === '0'){
        return thunkAPI.getState().bookStore.bookStore.slice().sort((r1, r2) => {
            return r1.average_rating - r2.average_rating;
        })
    }else if(params === '6'){
        return thunkAPI.getState().bookStore.bookStore.slice().sort((r1, r2) => {
            return r2.average_rating - r1.average_rating;
        })
    }else{
        return thunkAPI.getState().bookStore.bookStore.filter((book) => book.average_rating < params).sort((r1, r2) => {
            return r2.average_rating - r1.average_rating;
        })
    }
})





export const ecsSlice = createSlice({
    name: 'bookStore',
    initialState: {
        searchResult: [],
        bookInCart:[],
        bookStore: [],
    },
    reducers: {
        addDataInBookStore: (state, action) => {
            console.log(action);
            state.bookStore = action.payload;
        },
        addInCart: (state, action) => {
            if(!state.bookInCart.includes(action.payload)){
                state.bookInCart.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.bookInCart = action.payload;          
        }
        
    },
    extraReducers: {
        [AsyncThunkgetBookInfoFromAPI.fulfilled]: (state, action) => {
            console.log("fulfilled ", action);
            state.bookStore = action.payload;
        },
        [AsyncThunkSearch.fulfilled]: (state, action) => {
            console.log("fulfilled search ", action);
            state.searchResult = action.payload;
        }
    }

})

export const {addDataInBookStore, addInCart, removeFromCart} = ecsSlice.actions;



export const bookData = state => state.bookStore;
