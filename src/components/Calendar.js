import React from 'react'

export default function Calendar({ onChange = () => { }, value = "" }) {

    return (
        <input
            type="date"
            value={value}
            name="dateOfBirth"
            onChange={onChange}
        />
    )
}