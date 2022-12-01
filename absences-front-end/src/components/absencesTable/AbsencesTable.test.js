import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AbsencesTable from "./AbsencesTable";

const mockStore = configureStore([]);

describe("AbsencesTable component", () => {
    let store;
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
    });


    it("should have a Absences data", () => {
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <AbsencesTable
                    absencesList={[
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
                    ]}
                />
            </Provider>
        );

        const absencesTableHeader = getByTestId("absences-table-header");
        expect(absencesTableHeader).toBeInTheDocument();
        expect(getByText(/sickness/i)).toBeInTheDocument();
        expect(getByText(/name/i)).toBeInTheDocument();
        expect(getByText(/Confirmed/i)).toBeInTheDocument();

    });

});
