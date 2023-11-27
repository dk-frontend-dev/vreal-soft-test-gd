import {useStore} from "@/store/store.ts";

function LoginPage() {
    const {bears} = useStore((state) => state);

    return <>login {bears}</>
}

export default LoginPage;
