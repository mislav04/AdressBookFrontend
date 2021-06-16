import React from 'react'
import { Card, Icon, Header } from 'semantic-ui-react'
import { useDispatch } from "react-redux"

import * as actions from "../actions"
import styles from "./ContactCard.module.scss"

export default function ContactCard({ contact, callback, onNameClick }) {
    const dispatch = useDispatch();

    const localActions = {
        addToFavourite: (contact) => dispatch(actions.contact.addToFavourite(contact, callback)),
        removeFromFavourite: (contact) => dispatch(actions.contact.removeFromFavourite(contact, callback))
    };

    const handleClick = () => {
        contact.isFavourite ? localActions.removeFromFavourite(contact, callback) : localActions.addToFavourite(contact, callback)
    }

    return (
        <>
            <Card>
                <Card.Content>
                    <Card.Header className={styles.title} onClick={() => onNameClick(contact.id)}>{contact.firstName + " " + contact.lastName}</Card.Header>
                    <Card.Description>
                        <strong>Contact type: </strong> {contact.contactType}
                    </Card.Description>
                    <Card.Description>
                        {contact.contact}
                    </Card.Description>
                </Card.Content>
                <Header as='h2' color='teal' textAlign='center'>
                    <Icon className={styles.icons} name={"favorite"} color={contact.isFavourite ? "yellow" : "grey"} onClick={handleClick}/>
                </Header>

            </Card>
        </>
    )
}