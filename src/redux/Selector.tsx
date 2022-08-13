import { useSelector } from "react-redux";
import { RootState } from "./store";

const useUser = () => {

    return  useSelector((state: RootState) => state.user) as any;
    
}

export { useUser };