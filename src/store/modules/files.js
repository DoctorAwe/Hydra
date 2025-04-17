import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    files: [],
    selectedImage: null,
    loaded: false
};

const sharedSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFiles(state, action) {
            state.files = action.payload;
        },
        addFile(state, action) {
            // 使用 Immer 自动处理不可变性
            state.files.push(action.payload);
        },
        updateFile(state, action) {
            const updatedFile = action.payload;
            state.files = state.files.map((file) =>
                file.shortLink === updatedFile.shortLink ? updatedFile : file
            );
        },
        setSelectedImage(state, action) {
            state.selectedImage = action.payload;
        },
        setLoaded(state, action) {
            state.loaded = action.payload;
        },
    },
});

export const { setFiles, setSelectedImage, addFile,updateFile, setLoaded} = sharedSlice.actions;

const filesReducer = sharedSlice.reducer
export default filesReducer;
