import { Button } from "@/components/ui/button";
import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const HomePage = () => {
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [message, dispatch, error]);

    return (
        <>
            <Button onClick={handleLogout}>LOGOUT</Button>
        </>
    );
};

export default HomePage;
