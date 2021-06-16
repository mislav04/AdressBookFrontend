import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"

import styles from "./AppHeader.module.scss"

export default function AppHeader({path}) {

    const history = useHistory()

    const goTo = (to) => {
        if(!path.endsWith(to)){
            history.push(to)
        }
    }

    return (
        <Segment clearing>
            <Header 
                className={styles.title} 
                as='h2' 
                floated='right' 
                color={path.endsWith("/adresar/omiljeni") ?  "green" : "teal"} 
                onClick={() => goTo("/adresar/omiljeni")}
            >
                Favourite
            </Header>
            <Header 
                className={styles.title} 
                as='h2' 
                floated='right' 
                color={path.endsWith("/kontakt") ?  "green" : "teal"}  
                onClick={() => goTo("/kontakt")}
            >
                New Contact
            </Header>
            <Header 
                className={styles.title} 
                as='h2' 
                floated='left' 
                color={path.endsWith("/adresar") ?  "green" : "teal"}  
                onClick={() => goTo("/adresar")}
            >
                Home
            </Header>
        </Segment>
    )
}