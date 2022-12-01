import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AbsenceFilters from "./AbsenceFilters";

const mockStore = configureStore([]);

describe("AbsenceFilters component", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            absences: {
                absencesList: []
            },
        });
    });

    it("should have a Absences Filters", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <AbsenceFilters
                    absencesProprties={{
                        limit: 10,
                        page: 1,
                        status: "",
                        startDate: null,
                        endDate: null,
                        showModal: false,
                        selectedAbsence: null,
                    }}
                />
            </Provider>
        );

        const mainAbsencesFilterComponent = getByTestId("absences-filters");
        const mainAbsencesFilterDatePickerStart = getByTestId("absences-filters-date-picker-start");
        const mainAbsencesFilterDatePickerEnd = getByTestId("absences-filters-date-picker-end");
        const mainAbsencesFilterStatusMenu = getByTestId("absences-filters-status-menu");
        expect(mainAbsencesFilterComponent).toBeInTheDocument();
        expect(mainAbsencesFilterDatePickerStart).toBeInTheDocument();
        expect(mainAbsencesFilterDatePickerEnd).toBeInTheDocument();
        expect(mainAbsencesFilterStatusMenu).toBeInTheDocument();

    });

});
