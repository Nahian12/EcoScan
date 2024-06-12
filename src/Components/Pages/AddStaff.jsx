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
        <Form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', margin: '20px' }}>Add Staff</h2>
            <Form.Group controlId="inputName" style={{ margin: '0 auto', width: 'fit-content' }}>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ width: '300px', marginBottom: '10px', margin: '0 auto' }}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading} style={{ width: '200px', marginTop: '10px', marginBottom: '10px' }}>
                {loading ? 'Loading...' : 'Submit'}
            </Button>
        </Form>
    )
}