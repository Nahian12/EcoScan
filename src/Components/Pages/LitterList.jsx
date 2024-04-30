import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import { ListGroup } from 'react-bootstrap';


export default function LitterList() {
    const [trash, setTrash] = useState([]);
    
    async function fetchData() {
        let { data: trashData, error } = await supabase.from('trash').select('*')

        setTrash(trashData);    
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="app-layout">
            <ListGroup>
                {trash.map(trash => (
                    <ListGroup.Item key={trash.id}>{trash.text}</ListGroup.Item>
                    // Replace 'columnName' with the actual name of the column you want to display
                ))}
            </ListGroup>
        </div>
    );
}
