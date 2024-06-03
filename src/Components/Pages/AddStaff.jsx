import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import supabase from '../../supabase';
import Button from 'react-bootstrap/Button';

export default function AddStaff() {

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        const { data, error } = await supabase.from('staff').insert([{ text: text }]).select()
        setLoading(false);
        setText('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="inputName">Add Staff</Form.Label>
            <Form.Control
                type="text"
                id="inputName"
                aria-describedby="textHelpBlock"
                placeholder="Enter Name"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <Form.Text id="textHelpBlock" muted>
                Enter name of staff
            </Form.Text>
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Loading…' : 'Submit'}
            </Button>
        </Form>
        
    )
}