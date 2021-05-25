import React from 'react'
import Page from "../components/Page.js"
import Container from "../components/Container"
import "../styles/main.css"

const technologies = [
    {
        image: "fab fa-react",
        name: "React.js"
    },
    {
        image: "fab fa-js",
        name: "JavaScript"
    },
    {
        image: "fab fa-node-js",
        name: "Node.js"
    },
    {
        image: "fab fa-github",
        name: "GIT"
    },
    {
        image: "fas fa-database",
        name: "PostgreSQL"
    }
]

const Main = () => {
    return (
        <Page>
            <div className="home">
                <Container>
                    <div className={"title"}>
                        <h1>Welcome to my app!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, consequuntur distinctio
                            dolor
                            eos,
                            eum in magnam minima modi mollitia officia, quos recusandae ut vero. At omnis provident
                            reprehenderit
                            ut? Cupiditate! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
                            laboriosam
                            officia
                            voluptas? At incidunt inventore tenetur. A animi dicta distinctio earum, eos illum inventore
                            magnam
                            natus nesciunt sit totam voluptatem.</p>
                        <br/>
                        <h1>Technology stack:</h1>
                        <ul>
                            {technologies.map((item, idx) => {
                                return (
                                    <div className={"technologies"}>
                                        <i className={item.image}/>
                                        <p>{item.name}</p>
                                    </div>
                                )
                            })}
                        </ul>
                        <br/>
                        <h1>Commercial experience: 10 months</h1>
                        <h1>In web developing: 2 years</h1>
                    </div>
                    <div className={"info"}>
                        <h1>Created by: Bogdan Slavniy</h1>
                        <p>Position: front end developer</p>
                        <div className={"image"}/>
                    </div>
                </Container>
            </div>
        </Page>
    );
};

export default Main