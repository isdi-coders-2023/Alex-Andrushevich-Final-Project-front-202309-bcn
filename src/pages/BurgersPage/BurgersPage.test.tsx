import { screen, waitFor, within } from "@testing-library/react";
import renderWithProviders, {
  mockStore,
} from "../../testUtils/renderWithProviders";
import BurgersPage from "./BurgersPage";
import { server } from "../../mocks/node";
import { errorHandlers } from "../../mocks/errorHandlers";
import userEvent from "@testing-library/user-event";
import { deleteBurgerErrorHandlers } from "../../mocks/deleteBurgerHandler";

beforeEach(() => {
  server.resetHandlers();
});

describe("Given a BurgersPage component", () => {
  describe("When it is rendered", () => {
    test("Then the title 'Our Burgers' should be visible", () => {
      const titleText = "Our Burgers";

      renderWithProviders(<BurgersPage />);
      const actualBurgerPage = screen.getByRole("heading", { name: titleText });

      expect(actualBurgerPage).toBeVisible();
    });

    describe("When it encounters an error fetching from API", () => {
      test("Then a toast message with 'Error loading burgers' is visible", async () => {
        server.use(...errorHandlers);

        renderWithProviders(<BurgersPage />);

        await waitFor(async () => {
          const expectedToastMessage = "Error loading burgers";
          const actualToast = await screen.getByText(expectedToastMessage);

          expect(actualToast).toBeInTheDocument();
        });
      });
    });

    describe("When a user clicks on the 'Delete' button on the Classic Burger card", () => {
      test("Then the Classic Burger should not be in the document and toast message 'Burger delete successfully' is displayed", async () => {
        const user = userEvent.setup();
        const expectedDeleteButtonText = "Delete";
        const expectedToastMessage = "Burger deleted succesfully";

        renderWithProviders(<BurgersPage />);

        const actualClassicBurger = screen.getByRole("article", {
          name: "Classic Burger",
        });

        const deleteButtonForClassicBurger = within(
          actualClassicBurger,
        ).getByRole("button", {
          name: expectedDeleteButtonText,
        });

        expect(actualClassicBurger).toBeVisible();

        await user.click(deleteButtonForClassicBurger);

        await waitFor(async () => {
          const toastMessage = screen.getByText(expectedToastMessage);

          expect(actualClassicBurger).not.toBeVisible();

          expect(toastMessage).toBeInTheDocument();
        });
      });

      describe("When the user clicks on Classic Burger's delete button and it encounters an error", () => {
        test("Then it should show the toast message 'Error deleting burger, please try again later' ", async () => {
          server.use(...deleteBurgerErrorHandlers);

          const expectedToastMessage =
            "Error deleting burger, please try again later";

          const classicBurgerName = "Classic Burger";
          const deleteButtonText = "Delete";
          const user = userEvent.setup();

          renderWithProviders(<BurgersPage />, mockStore);

          const actualClassicBurger = screen.getByRole("article", {
            name: classicBurgerName,
          });
          const classicBurgerDeleteButton = within(
            actualClassicBurger,
          ).getByRole("button", {
            name: deleteButtonText,
          });

          await user.click(classicBurgerDeleteButton);

          await waitFor(async () => {
            const toastMessage = screen.getByText(expectedToastMessage);
            expect(toastMessage).toBeVisible();
          });
        });
      });
    });
  });
});
