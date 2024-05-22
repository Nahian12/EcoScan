import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Toast from 'react-bootstrap/Toast'


export default function DeleteStaff({id}) {

    const [loading, setLoading] = useState(false);
    

    async function handleDelete() {
        setLoading(true);
        const { error } = await supabase
        .from('staff').delete().eq('id', id)
        setLoading(false);

        <Toast>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">error or not</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>

    }


    return (
        <FontAwesomeIcon icon={faEnvelope} 
        onClick={handleDelete}
        isLoading={loading}/>
    )
}