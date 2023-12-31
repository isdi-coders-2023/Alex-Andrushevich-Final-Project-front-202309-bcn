import { screen } from "@testing-library/react";
import { editedCheeseBurgerMock } from "../../store/features/burgers/mocks/burgersMock";
import renderWithProviders from "../../testUtils/renderWithProviders";
import BurgerCard from "./BurgerCard";

describe("Given a BurgerCard component", () => {
  describe("When it is instantiated with a Cheese Burger", () => {
    test("Then the title 'Cheese Burger' is visible", () => {
      const cheeseBurgerTitle = "Cheese Burger";

      renderWithProviders(<BurgerCard burger={editedCheeseBurgerMock} />);
      const actualCheeseBurgerTitle = screen.getByRole("heading", {
        name: cheeseBurgerTitle,
      });

      expect(actualCheeseBurgerTitle).toBeVisible();
    });

    test("The the background image is visible", () => {
      renderWithProviders(<BurgerCard burger={editedCheeseBurgerMock} />);
      const actualBackgroundImage = screen.getByRole("img");

      expect(actualBackgroundImage).toBeVisible();
    });
  });
});
