import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Card, CardBody, } from 'reactstrap';

import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

function RegisterUser() {

    const MESSAGES = {
        INPUT_EMPTY: 'Preencha os campos',
        EMAIL_NOT_MATCH: 'Confirmação de e-mail não confere',
        PASSWORD_NOT_MATCH: 'Confirmação de senha não confere',
        USER_EXIST: 'Usuário já cadastrado no nosso sistema',
        TUTOR_REGISTER_SUCCESS: 'Tutor cadastrado com sucesso, efetue login'
    }

    const CLASSES = {
        TEXT_DANGER: 'text-danger',
        TEXT_SUCCESS: 'text-success'
    }

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");
    const [confirmationEmail, setConfirmationEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [classMessage, setClassMessage] = useState("");

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
            configurationMessage(true, MESSAGES.INPUT_EMPTY, CLASSES.TEXT_DANGER);
            return;
        }

        if (data.email !== data.confirmationEmail) {
            setLoading(false);
            configurationMessage(true, MESSAGES.EMAIL_NOT_MATCH, CLASSES.TEXT_DANGER);
            return;
        }

        if (data.password !== data.confirmationPassword) {
            setLoading(false);
            configurationMessage(true, MESSAGES.PASSWORD_NOT_MATCH, CLASSES.TEXT_DANGER);
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
            .then(_ => {
                setLoading(false);
                configurationMessage(true, MESSAGES.TUTOR_REGISTER_SUCCESS, CLASSES.TEXT_SUCCESS);
                resetInputsForm();
            })
            .catch(error => {
                setLoading(false);
                if (error.response.data.code === 102) {
                    configurationMessage(true, MESSAGES.USER_EXIST, CLASSES.TEXT_DANGER);
                }
            });

    }

    const configurationMessage = (showMessage, message, classMessage) => {
        setShowMessage(showMessage);
        setMessage(message);
        setClassMessage(classMessage);
    }

    const resetInputsForm = () => {
        setName('');
        setEmail('');
        setConfirmationEmail('');
        setPassword('');
        setConfirmationPassword('');
    }

    return (
        <div className="container mt-5">
            <Card>
                <CardBody>

                    <h2 className="text-muted text-center mb-5">Criar sua conta no PetBook</h2>

                    {showMessage && <p className={`text-center ${classMessage}`}>{message}</p>}

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Tutor, preencha seu nome</Label>
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