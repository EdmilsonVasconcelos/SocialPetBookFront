import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Card, CardBody, } from 'reactstrap';

import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

function RegisterUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmationEmail, setConfirmationEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        validForm({ name, email, password, confirmationEmail, confirmationPassword });

    };

    const validForm = data => {
        if (data.email === ""
            || data.password === ""
            || data.confirmationEmail === ""
            || data.confirmationPassword === ""
            || data.name === "") {
            setLoading(false);
            setShowMessage(true);
            setMessage("Preencha os campos");
            return;
        }

        if (data.email !== data.confirmationEmail) {
            setLoading(false);
            setShowMessage(true);
            setMessage("Confirmação de e-mail não confere");
            return;
        }

        if (data.password !== data.confirmationPassword) {
            setLoading(false);
            setShowMessage(true);
            setMessage("Confirmação de senha não confere");
            return;
        }

        submit(data)
    }

    const submit = async data => {

        axios.post(`${API_BASE_URL}/user`, {
            name: data.name,
            email: data.email,
            password: data.password
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data.message);
            });

    }

    return (
        <div className="container mt-5">
            <Card>
                <CardBody>

                    <h2 className="text-muted text-center mb-5">Criar sua conta no PetBook</h2>

                    {showMessage && <p className="text-danger text-center">{message}</p>}

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Preencha seu nome, Tutor</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nome"
                                maxLength="100"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyUp={() => { setShowMessage(false); setLoading(false) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Preencha seu e-mail</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                maxLength="100"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyUp={() => { setShowMessage(false); setLoading(false) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirm-email">Confirme seu e-mail</Label>
                            <Input
                                type="email"
                                name="confirm-email"
                                id="confirm-email"
                                placeholder="Confirmação de e-mail"
                                maxLength="100"
                                value={confirmationEmail}
                                onChange={e => setConfirmationEmail(e.target.value)}
                                onKeyUp={() => { setShowMessage(false); setLoading(false) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Preencha sua senha</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Senha"
                                maxLength="50"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyUp={() => { setShowMessage(false); setLoading(false) }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirm-password">Preencha sua senha</Label>
                            <Input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                placeholder="Confirmação de senha"
                                maxLength="50"
                                value={confirmationPassword}
                                onChange={e => setConfirmationPassword(e.target.value)}
                                onKeyUp={() => { setShowMessage(false); setLoading(false) }} />
                        </FormGroup>

                        <div className="row mt-4">
                            <div className="col-sm text-left">
                                <Button color="success">{loading ? "Cadastrando..." : "Cadastrar"}</Button>
                            </div>
                            <div className="col-sm text-right">
                                <Link to="/login" className="ml-3">Já possui conta?</Link>
                            </div>
                        </div>

                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default RegisterUser;