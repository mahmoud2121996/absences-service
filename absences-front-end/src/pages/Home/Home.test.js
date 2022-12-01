import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Home from "../Home/Home";

const mockStore = configureStore([]);

describe("Home component", () => {
    let store;
    let isEmptyStore;
    let isErrorStore;

    beforeEach(() => {
        store = mockStore({
            absences: {
                absencesList: [
                    {
                        "admitterId": null,
                        "admitterNote": "",
                        "confirmedAt": "2020-12-12T18:03:55.000+01:00",
                        "createdAt": "2020-12-12T14:17:01.000+01:00",
                        "crewId": 352,
                        "endDate": "2021-01-13",
                        "id": 2351,
                        "memberNote": "",
                        "rejectedAt": null,
                        "startDate": "2021-01-13",
                        "type": "sickness",
                        "userId": 2664,
                        "status": "Confirmed",
                        "member": {
                            "crewId": 352,
                            "id": 2650,
                            "image": "https://loremflickr.com/300/400",
                            "name": "Mike",
                            "userId": 2664
                        }
                    }
                ]
            },
        });
        isEmptyStore = mockStore({
            absences: {
                absencesList: []
            },
        });

        isErrorStore = mockStore({
            absences: {
                absencesList: [],
                isError: true
            },
        });
    });

    it("should have a title", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(getByText(/Absences Dashboard/i)).toBeInTheDocument();
    });

    it("should have absences table component rendered", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const el = getByTestId("absences-table");
        expect(el).toBeInTheDocument();
    });

    it("should have Pagination component rendered", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const el = getByTestId("absences-Pagination");
        expect(el).toBeInTheDocument();
    });

    it("should have absences filters component rendered", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const el = getByTestId("absences-filters");
        expect(el).toBeInTheDocument();
    });

    it("when it have empty absences it should render empty message", () => {
        const { getByText } = render(
            <Provider store={isEmptyStore}>
                <Home />
            </Provider>
        );

        expect(getByText(/No Absences to Show/i)).toBeInTheDocument();
    });

    it("when error occurs it should render Error message", () => {
        const { getByText } = render(
            <Provider store={isErrorStore}>
                <Home />
            </Provider>
        );

        expect(getByText(/Error...Failed To Fetch Absences Data/i)).toBeInTheDocument();
    });
});
