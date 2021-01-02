import React, { useState } from 'react';

import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';

import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';

function MyPets() {
    return (
        <div className="container mt-5">
            <Card>
                <CardBody>

                    <h2 className="text-muted text-center mb-5">Você está na página de pets do PetBook</h2>

                </CardBody>
            </Card>
        </div>
    );
}

export default MyPets;