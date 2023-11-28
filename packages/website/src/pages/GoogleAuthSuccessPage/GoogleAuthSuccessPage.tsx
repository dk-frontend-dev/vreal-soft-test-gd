import {useParams, useNavigate} from "react-router";
import {setItem} from "@/shared/lib/localStorageLib.ts";
import {ACCESS_TOKEN_KEY} from "@/shared/constants/commonConstants.ts";
import {Routes} from "@/shared/constants/routeConstants.ts";
import {useEffect} from "react";

function GoogleAuthSuccessPage() {
    let { accessToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setItem(ACCESS_TOKEN_KEY, accessToken);
        navigate(Routes.HOME)
    }, [])

    return <>Loading...</>
}

export default GoogleAuthSuccessPage;
