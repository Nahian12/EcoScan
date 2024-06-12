import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import { Table, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFilter } from '@fortawesome/free-solid-svg-icons'
import DeleteStaff from "./DeleteStaff";
import Layout from "../Layout/Layout";
// import { useRealtime } from 'react-supabase'
import AddStaff from "./AddStaff";



export default function StaffList() {

    // const [result, reexecute] = useRealtime('staff')
    // const { data: staffList, error, fetching } = result;

    const [staffList, setStaffList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const channels = supabase.channel('custom-all-channel')
        .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff' },
        (payload) => {
            // console.log('Change received!', payload)
        }
        )
        .subscribe()
        
    }, [fetchData()])
    
    
    async function fetchData() {
        let { data: staff, error } = await supabase.from('staff').select('*')

        setStaffList(staff);    
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredStaffList = staffList.filter(staff =>
        staff.text.toLowerCase().includes(search.toLowerCase())
    );
    

    if(!staffList || !staffList.length) {
        return (
            <Layout>
                <AddStaff />
                <h1>No data</h1>
            </Layout>
        )
    }

    return (
        // <Layout>
        //     <AddStaff />
        //     <div className="app-layout">
        //         <ListGroup>
        //             {staffList.map(staff => (
        //                 <ListGroup.Item key={staff.id}>{staff.text} 
        //                 <DeleteStaff id={staff.id}/>
        //                 </ListGroup.Item>
        //             ))}
        //         </ListGroup>
        //     </div>
        // </Layout>
        <Layout>
            <AddStaff />
            <div className="app-layout">
                <div className="search-container">
                    <InputGroup className="mb-3" style={{ width: '300px', marginBottom: '5px', marginTop: '10px', margin: '0 auto' }}>
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary" id="button-search">
                            Search
                        </Button>
                        {/* <Button variant="outline-secondary" id="button-filter">
                            <FontAwesomeIcon icon={faFilter} />
                        </Button> */}
                    </InputGroup>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Delete</th>
                            {/* <th>Gender</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaffList.map(staff => (
                            <tr key={staff.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{staff.id}</td>
                                <td>{staff.text}</td>
                                {/* <td>{staff.gender}</td>
                                <td>{staff.email}</td>
                                <td>{staff.contact}</td>
                                <td>{staff.status}</td> */}
                                <td>
                                    <DeleteStaff id={staff.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Layout>

        // <Layout>
        //     <AddStaff />
        //     <div className="app-layout">
        //         <table>
        //         <thead> {/* Table Header */}
        //             <tr>
        //             <th>ID</th>
        //             <th>Name</th>
        //             <th>Gender</th>
        //             <th>Email</th>
        //             <th>Contact</th>
        //             <th>Status</th>
        //             </tr>
        //         </thead>
        //         <tbody> {/* Table Body */}
        //             {staffList.map((staff) => (
        //             <tr key={staff.id}>
        //                 <td>{staff.id}</td>
        //                 <td>{staff.text}</td>
        //                 {/* Add other table data cells for Gender, Email, Contact, Status */}
        //             </tr>
        //             ))}
        //         </tbody>
        //         </table>
        //     </div>
        //  </Layout>
    );
}
