import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Card, CardBody, } from 'reactstrap';

import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        validForm({ email, password });

    };

    const validForm = data => {
        if (data.email === "" || data.password === "") {
            setLoading(false);
            setError(true);
            setMessageError("Preencha os campos");
        }
    }

    return (
        <div className="container mt-5">
            <Card>
                <CardBody>

                    <h2 className="text-muted text-center mb-5">Bem vindo ao PetBook</h2>

                    {error && <p className="text-danger text-center">{messageError}</p>}

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
                                onKeyUp={() => { setError(false); setLoading(false) }} />
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
                                onKeyUp={() => { setError(false); setLoading(false) }} />
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