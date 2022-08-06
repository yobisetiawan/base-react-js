import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useAuth = () => {

    const user = useSelector((state: RootState) => state.user) as any;

    return { user };
}

export { useAuth };