import React from 'react';
import {cleanup, render, screen} from '../../../__test__/test-utils';
import Dashboard from "../dashboard";

afterEach(cleanup);

describe('dashboard', () => {
    it('should render studio dashboard', async () => {
        render(<Dashboard/>, {initialState: {firebase: {profile: {role: "studio"}}}})

        expect(screen.getByText(/Faire une recherche de remplacement/i)).toBeInTheDocument()
    });
    it('shoud render teacher dashboard', async () => {
        render(<Dashboard/>, {initialState: {firebase: {profile: {role: "teacher"}}}})

        expect(screen.queryAllByText(/Faire une recherche de remplacement/i)).toHaveLength(0)
    });
});

