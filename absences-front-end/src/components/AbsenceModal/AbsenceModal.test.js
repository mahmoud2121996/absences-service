import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AbsenceModal from "./AbsenceModal";

const mockStore = configureStore([]);

describe("AbsenceModal component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            absences: {
                absencesList: []
            },
        });
    });

    it("should have a modal text", () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <AbsenceModal
                    buttonText="button-text"
                    modalText="modal-Text"
                    modalTitle="modal-Title"
                />
            </Provider>
        );

        const modalButton = getByTestId("modal-button");
        expect(modalButton).toBeInTheDocument();
        fireEvent.click(modalButton);
        expect(getByText(/button-text/i)).toBeInTheDocument();
        expect(getByText(/modal-Text/i)).toBeInTheDocument();
        expect(getByText(/modal-Title/i)).toBeInTheDocument();
    });

});
