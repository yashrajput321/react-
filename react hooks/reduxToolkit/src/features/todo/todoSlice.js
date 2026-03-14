import {creatSlice,nanoid} from '@reduxjs/toolkit'

const initialState = {
    todo:[{id:'1',title:'Learn Redux Toolkit'}]
}

const todoSlice = creatSlice({