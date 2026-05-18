import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//we need to make server URL variable and caal it from .env 
const SERVER_URL = process.env.REACT_APP_SERVER_URL;



const initialState = {
  user: {},
  usersList: [],// Stores the logged-in user's data (e.g., name, email)
  isLoading: false, // Tracks if an API call is in progress
  isSuccess: false, // Tracks if an API call was successful
  isError: false, // Tracks if an API call failed
};

// register user thunk
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      /* const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        ageCategory: userData.ageCategory,
        password: userData.password,
      });
 */
      const response = await axios.post(`${SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        ageCategory: userData.ageCategory,
        password: userData.password,
      });


      console.log(response);

      const user = response.data.user;
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Registration failed");
    }
  }
);

// --- Creating a Thunk for Logging In a User ---
// Similar to `registerUser`, this thunk handles user login
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    // Sending a POST request to the backend server at "http://localhost:3001/login"
    // The request body contains the user's email and password


    /*  const response = await axios.post("http://localhost:3001/login", {
       email: userData.email,
       password: userData.password,
     }); */



    const response = await axios.post(`${SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });


    // Extracting the user data from the server's response (e.g., the authenticated user)
    const user = response.data.user;

    // Logging the response for debugging
    console.log(response);

    // Returning the user data as the payload for the `fulfilled` action
    return user;
  } catch (error) {
    // If the login fails (e.g., wrong email/password), show an alert to the user
    const errorMessage = "Invalid credentials";
    alert(errorMessage);

    // Throwing an error to trigger the `rejected` action
    // This lets the Redux store know the login failed
    throw new Error(errorMessage);
  }
});

// --- Creating a Thunk for Logging Out a User ---
// This thunk handles user logout


export const logout = createAsyncThunk("users/logout", async () => {
  try {
    // Sending a POST request to the backend server at "http://localhost:3001/logout"
    // This might clear a session or token on the server


    /*  const response = await axios.post("http://localhost:3001/logout"); */

    const response = await axios.post(`${SERVER_URL}/logout`);


    // Note: The response isn't used here, but you could return data if needed
  } catch (error) {
    // Log any errors for debugging
    console.log(error);
    throw error;
  }
});



export const updateUserProfile = createAsyncThunk(

  "user/updateUserProfile",

  async (userData) => {

    try {

      const formData = new FormData();

      formData.append("email", userData.email);

      formData.append("name", userData.name);

      formData.append("phone", userData.phone);

      formData.append("gender", userData.gender);

      formData.append("ageCategory", userData.ageCategory);

      formData.append("password", userData.password);

      if (userData.profilePic) {

        formData.append("profilePic", userData.profilePic);

      }

      const response = /* await axios.put(

        `http://localhost:3001/updateUserProfile/${userData.email}`,

        formData

      ); */


        await axios.put(
          `${SERVER_URL}/updateUserProfile/${userData.email}`,
          formData
        );

      const user = response.data.user;

      return user;

    } catch (error) {

      console.log(error);

    }

  }

);

// Get all users

export const getUsers = createAsyncThunk(

  "users/getUsers",

  async () => {

    try {

     /*  const response = await axios.get("http://localhost:3001/getUsers"); */

     const response = await axios.get(`${SERVER_URL}/getUsers`);


      return response.data.users;

    } catch (error) {

      console.log(error);

      throw new Error("Fetching users failed");

    }

  }

);

// Delete user

export const deleteUser = createAsyncThunk(

  "users/deleteUser",

  async (email) => {

    try {

      /* await axios.delete(`http://localhost:3001/deleteUser/${email}`); */

      await axios.delete(`${SERVER_URL}/deleteUser/${email}`);

      return email;

    } catch (error) {

      console.log(error);

      throw new Error("Deleting user failed");

    }

  }

);






export const userSlice = createSlice({
  name: "users", // Name of the slice (used to identify it in the Redux store)
  initialState, // The initial state defined earlier (user, isLoading, isSuccess, isError)

  // --- Reducers ---
  // Reducers are functions that handle **synchronous** updates to the state.
  // They take the current state and an action, and return the updated state.
  reducers: {},

  // --- Extra Reducers ---
  // `extraReducers` handle **asynchronous** actions, like those from thunks.
  // We use a "builder" to define how the state changes for each thunk's lifecycle (pending, fulfilled, rejected).
  extraReducers: (builder) => {
    // --- Register User Thunk ---
    // When the `registerUser` thunk is pending (API call starts)
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true; // Set loading to true to show a spinner in the UI
      state.isError = false; // Reset error state
      state.isSuccess = false; // Reset success state
    });

    // When the `registerUser` thunk is fulfilled (API call succeeds)
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = true; // Bug: This should probably be `false` since the request is done
      // Note: The user data (`action.payload`) isn't stored here. You might want to add:
      // state.user = action.payload;
      state.isSuccess = true; // Mark the registration as successful
      state.isLoading = false; // Stop loading
    });

    // When the `registerUser` thunk is rejected (API call fails)
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false; // Stop loading
      state.isError = true; // Show an error message
    });



    // --- Login Thunk ---
    // When the `login` thunk is pending
    builder.addCase(login.pending, (state) => {
      state.isLoading = true; // Show loading spinner
      state.isError = false; // Reset error state
      state.isSuccess = false; // Reset success state
    });

    // When the `login` thunk is fulfilled
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload; // Store the logged-in user data in the state
      state.isLoading = false; // Stop loading
      state.isSuccess = true; // Mark the login as successful
      state.isError = false; // Reset error state
    });

    // When the `login` thunk is rejected
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false; // Stop loading
      state.isError = true; // Show an error in the UI
      state.isSuccess = false; // Reset success state
    });

    // --- Logout Thunk ---
    // When the `logout` thunk is pending
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true; // Show loading spinner
      state.isError = false; // Reset error state
      state.isSuccess = false; // Reset success state
    });

    // When the `logout` thunk is fulfilled
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {}; // Clear the user data
      state.isLoading = false; // Stop loading
      state.isSuccess = false; // Reset success status
      state.isError = false; // Reset error status
    });

    // When the `logout` thunk is rejected
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false; // Stop loading
      state.isError = true; // Show an error
      state.isSuccess = false; // Reset success status
    });



    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });




    builder.addCase(getUsers.fulfilled, (state, action) => {

      state.usersList = action.payload;

      state.isLoading = false;

      state.isSuccess = true;

      state.isError = false;

    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {

      state.usersList = state.usersList.filter(

        (user) => user.email !== action.payload

      );

    });



  },
});

// Exporting the synchronous actions (not used in this async version but included)
//export const { addUser, deleteUser, updateUser } = userSlice.actions;

// Exporting the reducer to be used in the Redux store
export default userSlice.reducer;




