import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import EditProfile from "./EditProfile";
import {Link} from "react-router-dom";
import {useProfile} from "./ProfileContext";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { profile } = useProfile();




    return (
        <main className="container mt-4">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group list-group-flush account-settings-links">
                                <a className="list-group-item list-group-item-action" href={`/profile/`}>General</a>
                                <a className="list-group-item list-group-item-action" href={`/profile/credit-cards`}>Credit card</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">User Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profile ? profile.username : 'Loading...'}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profile ? profile.real_name : 'Loading...'}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Phone</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profile ? profile.phoneNumber : 'Loading...'}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {profile ? profile.adress : 'Loading...'}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to={'/profile/edit'} className="btn btn-primary" >Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

};

export default Profile;
