import {useStore} from "@/store/store.ts";
import {Link} from "react-router-dom";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";

function HomePage() {
    const {bears, addBear} = useStore((state) => state);

    const clickHandler = () => {
        addBear();
    }

    return (
        <>
            <button onClick={() => clickHandler()}>{bears}</button>
            <AppButton text={'123'} className={'123'} />
            <Link to={'login'}>to login</Link>
        </>
    )
}

export default HomePage;
