import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import DeleteStaff from "./DeleteStaff";


export default function StaffList() {
    const [staffList, setStaffList] = useState([]);
    
    async function fetchData() {
        let { data: staff, error } = await supabase.from('staff').select('*')

        setStaffList(staff);    
    }

    useEffect(() => {
        fetchData();
    }, [])

    if(!staffList.length) {
        return (
            <h1>No data</h1>
        )
    }

    return (
        <div className="app-layout">
            <ListGroup>
                {staffList.map(staff => (
                    <ListGroup.Item key={staff.id}>{staff.text} 
                    <DeleteStaff id={staff.id}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
