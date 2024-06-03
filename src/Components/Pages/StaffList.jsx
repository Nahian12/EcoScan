import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import DeleteStaff from "./DeleteStaff";
import Layout from "../Layout/Layout";
import { useRealtime } from 'react-supabase'
import AddStaff from "./AddStaff";


export default function StaffList() {

    const [result, reexecute] = useRealtime('staff')
    const { data: staffList, error, fetching } = result;

    // const [staffList, setStaffList] = useState([]);
    
    // async function fetchData() {
    //     let { data: staff, error } = await supabase.from('staff').select('*')

    //     setStaffList(staff);    
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    if(!staffList || !staffList.length) {
        return (
            <Layout>
                <AddStaff />
                <h1>No data</h1>
            </Layout>
        )
    }

    return (
        <Layout>
            <AddStaff />
            <div className="app-layout">
                <ListGroup>
                    {staffList.map(staff => (
                        <ListGroup.Item key={staff.id}>{staff.text} 
                        <DeleteStaff id={staff.id}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Layout>
    );
}
