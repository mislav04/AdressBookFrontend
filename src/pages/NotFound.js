import React from 'react'
import Title from "../components/Title"
import styles from "./NotFound.module.scss"

export default function NotFound(props) {

    return (
        <div className={styles.container404}>
            <Title title="404 Page doesn't exist" icon="x"/>
        </div>
    )
}