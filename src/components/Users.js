import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import WalletIcon from '@mui/icons-material/Wallet';
import CreateIcon from '@mui/icons-material/Create';
import axios from "../api/axios";
import RowDetails from "./RowsDetails";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const refresh = useRefreshToken();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users',{
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            // controller.abort();
        }
    }, [])

    return (
        
        
        <>
        <table className="table">
            <thead>
                <tr className="table-dark">
                    <th scope="col">Id</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">X coordinate</th>
                    <th scope="col">Y coordinate</th>
                    <th scope="col">Payment status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>

            {users?.length
                ? (
                    <tbody>
                        {users.map((element, i) => {
                            return (
                                <>
                                    <tr>
                                        <td>{element._id}</td>
                                        <td>{element.username}</td>
                                        <td>{element.email}</td>
                                        <td>{element.contact}</td>
                                        <td>{element.x_coordinate}</td>
                                        <td>{element.y_coordinate}</td>
                                        <td>{element.payment_status.paied}</td>
                                        <td className="d-flex justify-content-between">
                                            <NavLink to={`rembourser/${element._id}`}>  <button className="btn btn-primary"><WalletIcon /></button></NavLink>
                                            <NavLink to={`payer/${element._id}`}>  <button className="btn btn-primary"><PaidIcon /></button></NavLink>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>

                ) : <p>No users to display</p>}
        </table>
        <button onClick={() => {console.log("getting ally payments")}}>Refresh</button>
    </>  
    );
};

export default Users;