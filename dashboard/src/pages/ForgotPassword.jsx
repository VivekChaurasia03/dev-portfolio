import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    clearAllForgotPasswordErrors,
    forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { loading, message, error } = useSelector(
        (state) => state.forgotPassword
    );
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleForgotPassword = () => {
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllForgotPasswordErrors());
        }
        if (isAuthenticated) {
            navigateTo("/");
        }
        if (message !== null) {
            toast.success(message);
        }
    }, [dispatch, isAuthenticated, error, loading]);

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
                <div className="min-h-[100vh] flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Forgot Password
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to receive a link to
                                reset your password
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Link
                                        to={"/login"}
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        Remember your password?
                                    </Link>
                                </div>
                            </div>
                            {loading ? (
                                <SpecialLoadingButton content={"Requesting"} />
                            ) : (
                                <Button
                                    type="submit"
                                    onClick={handleForgotPassword}
                                    className="w-full"
                                >
                                    Request for Link
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-muted">
                    <img
                        src="/FORGOT_PASS_HOLDER.png"
                        alt="fogot-pass"
                    />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
