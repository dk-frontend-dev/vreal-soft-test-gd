import {ReactNode} from "react";
import Header from "@/widgets/Header/Header.tsx";

interface MainLayoutProps {
    children: ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            Footer
        </>
    )
}

export default MainLayout;
