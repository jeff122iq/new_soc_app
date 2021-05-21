import React from 'react'
import Header from './Header.js'
import Container from './Container.js'
import "../styles/pages.css"
import Footer from "./Footer"

const Page = ({children}) => {
    return (
        <div>
            <Header/>
            <div className={"page"}>
                <Container>
                    <div className={"content"}>
                        {children}
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Page