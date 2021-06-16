import React from 'react'
import { Message } from 'semantic-ui-react'

import styles from "./ErrorMessage.module.scss"

export default function ErrorMessage({ title = "Error", subtitle = "", fixed = false }) {

    return (
        <Message negative className={fixed ? styles.errorMessageFixed : styles.ErrorMessage}>
            <Message.Header>{title}</Message.Header>
            <p>{subtitle}</p>
        </Message>
    )
}