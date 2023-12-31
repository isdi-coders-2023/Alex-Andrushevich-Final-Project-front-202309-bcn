import { useEffect } from "react";
import BurgersPageStyled from "./BurgersPageStyled";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadBurgersActionCreator } from "../../store/features/burgers/burgersSlice";
import BurgersList from "../../components/BurgersList/BurgersList";
import useBurgersApi from "../../hooks/useBurgerApi";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../../store/features/ui/uiSlice";

const BurgersPage = (): React.ReactElement => {
  const { getBurgers } = useBurgersApi();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    ({
      rootReducer: {
        uiReducer: { isLoading },
      },
    }) => isLoading,
  );

  useEffect(() => {
    (async () => {
      const hideLoadingAction = hideLoadingActionCreator();

      try {
        const showLoadingAction = showLoadingActionCreator();
        dispatch(showLoadingAction);

        const burgers = await getBurgers();

        const getBurgersAction = loadBurgersActionCreator(burgers);
        dispatch(getBurgersAction);
        dispatch(hideLoadingAction);
      } catch (error) {
        const toastErrorMessage = "Error loading burgers";
        toast.error(toastErrorMessage);
        dispatch(hideLoadingAction);
      }
    })();
  }, [dispatch, getBurgers]);

  return (
    <BurgersPageStyled className="burgers-page">
      {isLoading ? <Loading /> : null}
      <h2 className="burgers-page__title">Our Burgers</h2>
      <BurgersList />
    </BurgersPageStyled>
  );
};

export default BurgersPage;
