
import { Component, ReactNode } from "react";
import { AppProps } from "next/app";
import Navbar from "./Navbar";


function Layout({ Component, ...pageProps }: AppProps) {
    return (
        <div className='content'>
            <Navbar />
                <Component {...pageProps}/>
        </div>
    );
}


// const Layout = ({ children }) => {
//     return (
//         <div className='content'>
//             <Navbar />
//             {children}
//             <Navbar />
//         </div>
//     );
// }

export default Layout;