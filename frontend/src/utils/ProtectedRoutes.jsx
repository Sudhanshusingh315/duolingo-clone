import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProctedRoute() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate("/auth");
        }
    }, [userInfo]);

    return userInfo ? <Outlet /> : null;
}
