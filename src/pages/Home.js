import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

import { validateLoginForm } from '../lib/utils'
import ErrorMessage from "../components/ErrorMessage"
import Title from "../components/Title"
import styles from "./Home.module.scss"
import * as actions from "../actions"

export default function Home(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()
    const dispatch = useDispatch();

    const localActions = {
        loginUser: (email, callback) => dispatch(actions.login.loginUser(email, callback)),
    };

    const signInUser = async () => {
        const loginError = validateLoginForm(email, password)

        if (loginError) {
            setEmail('')
            setPassword('')
            setError(loginError)
        } else {
            setError("")
            localActions.loginUser(email, afterLoggedIn)
        }
    }

    const afterLoggedIn = () => {
        history.push("/adresar")
    }

    return (
        <div className={styles.container}>

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Title title="Log-in to your account" icon="sign-in" />
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <Button color='teal' fluid size='large' onClick={signInUser}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            {
                error &&
                <ErrorMessage title={"Error with login"} subtitle={error} fixed={true} />
            }

        </div>
    )
}