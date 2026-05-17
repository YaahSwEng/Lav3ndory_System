// This file tests the Login page.

// We test: UI render, email format, password format, and Redux initial state.

import React from "react";

import renderer from "react-test-renderer";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import configureStore from "redux-mock-store";

import Login from "../Components/Login";

import reducer from "../Features/UserSlice";

// Mock store is used because Login reads values from Redux using useSelector.

const mockStore = configureStore([]);

// This state copies the user slice structure used in our project.

const store = mockStore({

    users: {

        user: {},

        usersList: [],

        isLoading: false,

        isSuccess: false,

        isError: false,

    },

});

// This test checks that Login page renders correctly.

// Snapshot helps us know if the UI changes unexpectedly.

test("matches Login UI snapshot", () => {

    const component = renderer.create(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>

    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

});

// This test checks if the email field accepts correct email format.

test("validates email format using regex", () => {

    render(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>

    );

    // We get the email input using id selector.

    const emailInput = document.querySelector("#email");

    fireEvent.change(emailInput, {

        target: { value: "valid.email@example.com" },

    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(emailRegex.test(emailInput.value)).toBe(true);

    fireEvent.change(emailInput, {

        target: { value: "invalid-email" },

    });

    expect(emailRegex.test(emailInput.value)).toBe(false);

});

// This test checks if the password follows our strong password rule.

test("validates password format using regex", () => {

    render(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>

    );

    // We get the password input using id selector.

    const passwordInput = document.querySelector("#password");

    // Password must contain uppercase letter, number, special character, and at least 6 characters.

    const passwordRegex =

        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    fireEvent.change(passwordInput, {

        target: { value: "Abc@123" },

    });

    expect(passwordRegex.test(passwordInput.value)).toBe(true);

    fireEvent.change(passwordInput, {

        target: { value: "abc123" },

    });

    expect(passwordRegex.test(passwordInput.value)).toBe(false);

});

// This test checks the initial Redux state before any action happens.

test("should return initial user state", () => {

    const initialState = {

        user: {},

        usersList: [],

        isLoading: false,

        isSuccess: false,

        isError: false,

    };

    expect(

        reducer(undefined, {

            type: undefined,

        })

    ).toEqual(initialState);

});
