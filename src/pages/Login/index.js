import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Card, CardBody, } from 'reactstrap';

import { Link } from "react-router-dom";

import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

function Login() {

    const LOCALSTORAGE_TOKEN_LOGIN = 'social-petbook-login';

    const MESSAGES = {
        INPUT_EMPTY: 'Preencha os campos',
        USER_NOT_FOUND: 'Usuário não existe',
        INCORRECT_PASSWORD: 'Senha incorreta'
    }

    const CLASSES = {
        TEXT_DANGER: 'text-danger'
    }

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [classMessage, setClassMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        validForm({ email, password });
    };

    const validForm = data => {
        if (data.email === "" || data.password === "") {
            setLoading(false);
            configurationMessage(true, MESSAGES.INPUT_EMPTY, CLASSES.TEXT_DANGER);
            return;
        }

        submit(data);
    }

    const submit = async data => {

        axios.post(`${API_BASE_URL}/login`, {
            email: data.email,
            password: data.password
        })
            .then(response => {
                setLoading(false);
                localStorage.setItem(LOCALSTORAGE_TOKEN_LOGIN, JSON.stringify(response.data));
                history.push("/my-pets");
            })
            .catch(error => {
                setLoading(false);
                if (error.response.data.code === 110) {
                    configurationMessage(true, MESSAGES.USER_NOT_FOUND, CLASSES.TEXT_DANGER);
                }

                if (error.response.data.code === 111) {
                    configurationMessage(true, MESSAGES.INCORRECT_PASSWORD, CLASSES.TEXT_DANGER);
                }
            });

    }

    const configurationMessage = (showMessage, message, classMessage) => {
        setShowMessage(showMessage);
        setMessage(message);
        setClassMessage(classMessage);
    }

    return (
        <div className="container mt-5">
            <Card>
                <CardBody>

                    <h2 className="text-muted text-center mb-5">Bem vindo ao PetBook</h2>

                    {showMessage && <p className={`text-center ${classMessage}`}>{message}</p>}

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Preencha seu e-mail</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyUp={() => { setMessage(false); setLoading(false) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Preencha sua senha</Label>
                            <Input
                                type="password"
                                name="password"
                                id="Password"
                                placeholder="Senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyUp={() => { setMessage(false); setLoading(false) }} />
                        </FormGroup>

                        <div className="row mt-4">
                            <div className="col-sm text-left">
                                <Button color="success">{loading ? "Entrando..." : "Entrar"}</Button>
                            </div>
                            <div className="col-sm text-right">
                                <Link to="/register-user" className="ml-3">Não possui conta?</Link>
                            </div>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Login;