import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

export default function Title({ title = "", icon }) {

    return (
        <Header as='h2' color='teal' textAlign='center'>
            {icon && <Icon name={icon} />} {title}
        </Header>
    )
}