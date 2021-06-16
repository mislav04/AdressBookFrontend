import React from 'react'
import { Form } from 'semantic-ui-react'

export default function Filters({ onFilterChange = () =>{}, filters = {} }) {

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input 
                    fluid 
                    label='First name' 
                    placeholder='First name' 
                    onChange={(e, data) => onFilterChange("firstName", data.value)} 
                    value={filters.firstName}
                />
                <Form.Input 
                    fluid 
                    label='Last name' 
                    placeholder='Last name' 
                    onChange={(e, data) => onFilterChange("lastName", data.value)} 
                    value={filters.lastName}
                />
                <Form.Input 
                    fluid 
                    label='Email' 
                    placeholder='Last name' 
                    onChange={(e, data) => onFilterChange("email", data.value)} 
                    value={filters.email}
                />
            </Form.Group>
        </Form>
    )
}