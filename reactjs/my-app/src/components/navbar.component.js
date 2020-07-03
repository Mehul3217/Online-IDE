import React,{Component} from "react";
import './navbar.component.css'
import { MDBView } from "mdbreact";
class Navbar extends Component {

    constructor(props) 
    {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
        collapsed: true,
        };
    }
    toggleNavbar() 
    {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() 
    {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark transparent-nav">
                <div className="container">
                    <div className="brand">
                        <a className="navbar-brand" href="#">Placement Saga</a>
                        <div className="logo">
                            <div className="logo"></div>
                            <div className="logo"></div>
                            <div className="logo"></div>
                            <div className="logo"></div>
                        </div>
                     </div>
                    <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`${classOne}`} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto" >
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Question Library</a>
                            </li>
                            <li className="nav-item">
                                <div className="foo">
                                    <a className="nav-link" href="#">Login</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;
