import { useSelector } from "react-redux";
import { RootState } from "./store";

const useUser = () => {

    const user = useSelector((state: RootState) => state.user) as any;

    return { user };
}

export { useUser };