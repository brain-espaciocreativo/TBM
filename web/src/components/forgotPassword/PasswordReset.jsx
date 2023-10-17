import { useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import './PasswordReset.css';
import { Link } from "react-router-dom";
import {config} from '../../config/config.js';

const ForgotPassword = () =>{


    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const userEmail = {
            email: e.target.email.value
        };
        await axios.post(`${config.apiURL}/user/sendpasswordlink` , userEmail)
            .then( (res) =>{
                Swal.fire({
                    showConfirmButton: true,
                    icon:'success',
                    text:'revise su email, se le ha enviado un enlace para crear nueva contraseña'
                })
            }).catch((error)=>{
                Swal.fire({
                    showConfirmButton: true,
                    icon:'error',
                    text:'ah ocurrido un error '
                })
            })
    }

    return (
        <div className="container">
            <div className="container-logo">
                <Link to='/'>
                    <img src={"./logo.jpg"} width='250' className="img" alt="" />
                </Link>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                    <h3 className="contraseña">recuperar contraseña</h3>
                    <p className="text">Para poder recuper su contraseña por favor ingrese su Email</p>
                    <input className="input" type="email" name="email" placeholder="ingresar email" required />
                    <div>
                        <button className="enviar">enviar</button>
                    </div>
            </form>
        </div>
    )
}


export default ForgotPassword;
