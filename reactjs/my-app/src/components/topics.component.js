import React,{Component} from 'react'
import './topics.component.css'
import { MDBView } from "mdbreact";

class Topics extends Component {
    render() {
        return (
            <div>
                <div className="heading">
                    Every Topic You need for your 
                    <br/>
                    <strong>Coding Interview</strong>
                </div>
                <br/>
                <div className="contain">
                    <div>
                        <MDBView hover zoom>
                            <div className="icon1">
                                Array
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon2">
                                Sorting
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon3">
                                Strings
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon4">
                                Linked List
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon2">
                                Tries
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon3">
                                Bit-
                                Manipulation
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon1">
                                Trees
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon4">
                                Recursion
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon3">
                                Heaps
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon1">
                                Grpahs
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon4">
                                Hashing
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon2">
                                Searching
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon3">
                                Dynamic
                                Programming
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon4">
                                Binary Search Tree
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon1">
                                Backtracking
                            </div>        
                        </MDBView>
                    </div>
                    <div>
                        <MDBView hover zoom>
                            <div className="icon2">
                                Famous
                                Algorithms
                            </div>        
                        </MDBView>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topics