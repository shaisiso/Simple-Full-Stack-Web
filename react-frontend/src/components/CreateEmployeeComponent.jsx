import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,
            firstName:'',
            lastName:'',
            email:''
        }
       // this.changeFirstName=this.changeFirstName.bind(this);
    }
    componentDidMount() {
        if(this.state.id !=='_add'){ //show details just on update
            EmployeeService.getEmployeeById(this.state.id).then(res=>{
                let employee=res.data;
                this.setState({firstName: employee.firstName, lastName: employee.lastName, email: employee.email})
            })
        }
    }
    setTitle=()=>{
        if(this.state.id === '_add')
            return <h3 className="text-center">Add Employee</h3>
        else
            return <h3 className="text-center">Update Employee</h3>
    }
    changeFirstName=(e)=>{
        this.setState({firstName : e.target.value})
    }
    changeLastName=(e)=>{
        this.setState({lastName : e.target.value})
    }
    changeEmail=(e)=>{
        this.setState({email : e.target.value})
    }
    saveEmployee=(e)=>{
        e.preventDefault();
        let employee={firstName:this.state.firstName, lastName:this.state.lastName, email:this.state.email}
        if (this.state.id==='_add'){ //add new employee
            EmployeeService.addEmployee(employee).then(res=>{
                this.props.history.push('/employees');
            })
        }
        else{ //update existing employee
            EmployeeService.updateEmployee(this.state.id,employee).then(res=>{
                this.props.history.push('/employees')
            })
        }

    }
    cancel=()=>{
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div className="container" >
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3">
                       {
                           this.setTitle()
                       }
                       
                       <div className="card body">
                           <form>
                               <div className="form-group">
                                   <label>First Name</label>
                                   <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange={this.changeFirstName}/>
                               </div>
                               <div className="form-group">
                                   <label>Last Name</label>
                                   <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={this.state.lastName} onChange={this.changeLastName}/>
                               </div>
                               <div className="form-group">
                                   <label>Email</label>
                                   <input placeholder="Email" name="email" className="form-control"
                                    value={this.state.email} onChange={this.changeEmail}/>
                               </div>
                               <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                               <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft:"10px"}}>Cancel</button>
                           </form>

                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;