import React from 'react';
import {cleanup, render} from '@testing-library/react';
import DashboardProf from "../dashboardProf";

afterEach(cleanup);

describe('dashboardProf', () => {
    it('CheckboxWithLabel changes the text after click', async () => {
        let profile = {firstName: "Silly Name"};

        const {queryByLabelText, getByLabelText, findByText} = render(
            <DashboardProf profile={profile}/>
        );

        // le flag i pour ignorer les majuscules et minuscules (ceci est une regex)
        expect(await findByText(/Silly Name/i)).toBeDefined()

    });
});

