import { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css"
import Viego from '../public/Viego.jpg'
import Ahri from "../public/Ahri.jpg"

interface GlobalLayOut {
    children: ReactNode;
}

const Layout = ({ children }: GlobalLayOut) => {
    return (
        <>
            <Head>
                <title>League Year In Review</title>
            </Head>
            <div className={styles.bgWrap}>
                <Image
                    alt="Viego"
                    src={Viego}
                    placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        opacity: 0.75
                    }}
                />
            </div>
            <main className={styles.bgText}>
                <Navbar />
                {children}
            </main>

        </>

    );
}

export default Layout;