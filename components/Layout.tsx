import { ReactNode } from "react";
import Navbar from "./Navbar";

interface GlobalLayOut {
    children: ReactNode;
}

const Layout = ({children}: GlobalLayOut) => {
    return (
        <div className='content'>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}

export default Layout;