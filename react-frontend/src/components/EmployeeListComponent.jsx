import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class EmployeeListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            employees: []
        }
    }
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees: res.data});
        });
    }
    addEmployee= ()=>{
        this.props.history.push('/add-employee/_add');
    }
    updateEmployee=(id)=>{
        this.props.history.push(`/add-employee/${id}`);
    }
    deleteEmployee=(id)=>{
        EmployeeService.deleteEmployee(id).then((res)=>{
            this.setState({employees: this.state.employees.filter(e=> e.id !==id)})
        })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row" id="add-btn">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add employee</button>
                </div>
                <div className="row">
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee first name</th>
                                <th>Employee last name</th>
                                <th>Employee email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee=>
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={()=>this.updateEmployee(employee.id)}>Update</button>
                                            <button className="btn btn-danger" onClick={()=>this.deleteEmployee(employee.id)}
                                            style={{marginLeft:"10px"}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EmployeeListComponent;