import {ReactNode} from "react";

interface MainLayoutProps {
    children: ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
    return (
        <>
            Header
            <main>
                {children}
            </main>
            Footer
        </>
    )
}

export default MainLayout;
