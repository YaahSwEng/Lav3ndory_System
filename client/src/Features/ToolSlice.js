import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//we need to make server URL variable and caal it from .env 
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const initialState = {
    tools: [],
    tool: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};


// Get all tools from database
export const getTools = createAsyncThunk(

    "tools/getTools",

    async () => {

        try {

            /* const response = await axios.get("http://localhost:3001/getTools"); */

            const response = await axios.get(`${SERVER_URL}/getTools`);

            return response.data.tools;

        } catch (error) {

            console.log(error);

            throw new Error("Fetching tools failed");

        }

    }

);

// Add new tool to database
export const addTool = createAsyncThunk(
    "tools/addTool",
    async (toolData) => {
        try {
            const formData = new FormData();

            formData.append("toolid", toolData.toolid);
            formData.append("toolname", toolData.toolname);
            formData.append("description", toolData.description);
            formData.append("condition", toolData.condition);
            formData.append("category", toolData.category);
            formData.append("availability", toolData.availability);
            formData.append("price", toolData.price);

            if (toolData.image) {
                formData.append("image", toolData.image);
            }

            /* const response = await axios.post(
                "http://localhost:3001/addTool",
                formData
            );
 */

            const response = await axios.post(
                `${SERVER_URL}/addTool`,
                formData
            );

            return response.data.tool;
        } catch (error) {
            console.log(error);
            throw new Error("Adding tool failed");
        }
    }
);



// Delete tool from database
export const deleteTool = createAsyncThunk(

    "tools/deleteTool",

    async (toolid) => {

        try {

            /* await axios.delete(`http://localhost:3001/deleteTool/${toolid}`); */

            await axios.delete(`${SERVER_URL}/deleteTool/${toolid}`);

            return toolid;

        } catch (error) {

            console.log(error);

            throw new Error("Deleting tool failed");

        }

    }

);



// Update tool information
export const updateTool = createAsyncThunk(

    "tools/updateTool",

    async (toolData) => {

        try {

            const formData = new FormData();

            formData.append("toolname", toolData.toolname);

            formData.append("description", toolData.description);

            formData.append("condition", toolData.condition);

            formData.append("category", toolData.category);

            formData.append("availability", toolData.availability);

            formData.append("price", toolData.price);

            if (toolData.image) {

                formData.append("image", toolData.image);

            }

            /*  const response = await axios.put(
 
                 `http://localhost:3001/updateTool/${toolData.toolid}`,
 
                 formData
 
             ); */



            const response = await axios.put(

                `${SERVER_URL}/updateTool/${toolData.toolid}`,

                formData

            );

            return response.data.tool;

        } catch (error) {

            console.log(error.response?.data || error.message);

            throw error;

        }


    }

);



//likes
export const toggleLike = createAsyncThunk(
    "tools/toggleLike",
    async ({ id, email }) => {

        try {

            /* const response = await axios.put(
                `http://localhost:3001/toggleLike/${id}`,
                { email }
            );
 */

            const response = await axios.put(
               `${SERVER_URL}/toggleLike/${id}`,
                { email }
            );


            return response.data.tool;

        } catch (error) {

            console.log(error);

            throw new Error("Like failed");

        }
    }
);


export const toolSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTools.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getTools.fulfilled, (state, action) => {
            state.tools = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
        });

        builder.addCase(getTools.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(addTool.fulfilled, (state, action) => {
            state.tools.push(action.payload);
            state.isSuccess = true;
        });

        builder.addCase(deleteTool.fulfilled, (state, action) => {

            state.tools = state.tools.filter(

                (tool) => tool.toolid !== action.payload

            );

        });





        //////


        builder.addCase(updateTool.fulfilled, (state, action) => {

            state.tools = state.tools.map((tool) =>

                tool.toolid === action.payload.toolid

                    ? action.payload

                    : tool

            );

            state.isLoading = false;

            state.isSuccess = true;

            state.isError = false;

        });

        builder.addCase(updateTool.rejected, (state) => {

            state.isLoading = false;

            state.isError = true;

            state.isSuccess = false;

        });





        builder.addCase(toggleLike.fulfilled, (state, action) => {

            const index = state.tools.findIndex(
                (tool) => tool._id === action.payload._id
            );

            if (index !== -1) {

                state.tools[index] = action.payload;

            }

        });








    },
});

export default toolSlice.reducer;