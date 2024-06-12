import React from 'react';
import { Link } from 'react-router-dom';
import { useGoods } from "../good/GoodContext";
import {hasRoleAdmin} from "../../helpers/axios_helper";
import NoRoleAdminButton from "../block/NoRoleAdminButton";

const AdminPanel = () => {
    const { goods } = useGoods();
    const isAdmin = hasRoleAdmin();
    return (
        <div>
            {isAdmin ? (
        <main className="container mt-4">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="list-group list-group-flush account-settings-links">
                                <Link to="/profile" className="list-group-item list-group-item-action">General</Link>
                                <Link to="/profile/Admin-panel" className="list-group-item list-group-item-action active">Admin panel</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Admin Panel</h5>
                            <div className="mb-3">
                                <Link to="/good/add" className="btn btn-primary me-2">Add Good</Link>
                                <Link to="/price/add" className="btn btn-secondary">Add Price</Link>
                            </div>
                            {goods.map(good => (
                                <div className="row" key={good.id}>
                                    <div className="col-lg-10">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Edit price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr key={good.id}>
                                                <td>
                                                    <img src={good.goodPhoto[0]} alt="Good Image"
                                                         style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                                </td>
                                                <td style={{ verticalAlign: 'middle' }}>{good.goodName}</td>
                                                <td style={{ verticalAlign: 'middle' }}>{good.goodDescription}</td>
                                                <td style={{ verticalAlign: 'middle' }}>${good.clientPrice}</td>
                                                <td style={{ verticalAlign: 'middle' }}>
                                                    <Link to={`/price/edit/${good.priceId}`} className="btn btn-success">Edit price</Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
            ) : (
                <NoRoleAdminButton/>
            )
            }
        </div>
    );
};

export default AdminPanel;
