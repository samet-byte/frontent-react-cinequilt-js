import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import MakeAdminBox from "./composes/MakeAdminBox";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLoading from "../hooks/useLoading";
import Loading from "./composes/Loading";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, startLoading, stopLoading } = useLoading();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users/all", {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                // console.log(err);
                if (err.name !== "CanceledError") {
                    err.response?.status === 403
                        ? alert(err.name + " -> Unauthorized or Access Token Expired")
                        : alert(err.name + " -> " + err.message);
                    navigate("/login", { state: { from: location }, replace: true });
                }
            } finally {
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []); // This useEffect will only run once when the component mounts

    const makeAdmin = async (userToModify) => {
        startLoading()
        try {
            const response = await axiosPrivate.patch(
                `/users/make-admin/${userToModify?.username}`,
                {},
                {}
            );
            console.log(response.data);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.username === userToModify.username ? response.data : user
                )
            );
        } catch (err) {
            // ... (same error handling as before)
        } finally {
            stopLoading()
        }
    };

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <Table striped bordered hover style={{backgroundColor: "transparent", borderRadius: 30, }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, i) => (
                        <tr key={i}>
                            <td>{user?.id}</td>
                            <td>{user?.username}</td>
                            <td>{user?.role}</td>
                            <td>
                                {/* Use the new component here */}
                                <MakeAdminBox user={user} onChange={makeAdmin} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>No users to display</p>
            )}
            {isLoading ? <Loading tiny={true}/> : null}
        </article>
    );
};

export default Users;
