import React from 'react';
import {cleanup, render, screen} from '../../../__test__/test-utils';
import SignUp from "../signUp";
import userEvent from "@testing-library/user-event";

const mockNewUserSignUp = jest.fn().mockName("mockNewUserSignUp")
const mockSendMailConfirmation = jest.fn().mockName("mockSendMailConfirmation")

jest.mock('firebase/app', () => ({
    initializeApp: () => ({
        firestore: () => ({
            settings: jest.fn()
        })
    }),
    storage: jest.fn(),
    functions: () => ({
        httpsCallable: (functionName) => {
            switch (functionName) {
                case "newUserSignUp":
                    return mockNewUserSignUp
                case "sendMailConfirmation":
                    return mockSendMailConfirmation
                default:
                    return jest.fn()
            }
        }
    }),
    auth: () => ({
        signInWithEmailAndPassword: Promise.resolve()
    })
}))

afterEach(cleanup);

describe('dashboard', () => {
    it('should render studio dashboard', async () => {
        render(<SignUp/>, {
            initialState: {
                firebase: {auth: {}},
                auth: {authError: null}
            }
        })

        await userEvent.click(screen.getByText(/S'enregistrer/i))

        expect(mockNewUserSignUp).toHaveBeenCalled();
        expect(mockSendMailConfirmation).toHaveBeenCalled();
    });
});

