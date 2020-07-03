import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class Home extends Component {
	constructor(props) {
    super(props);

    this.onChangecode = this.onChangecode.bind(this)
    this.onChangelang = this.onChangelang.bind(this)
    this.onChangeinput = this.onChangeinput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
    	id: 71,
      code: '',
      input: '',
      lang: 'c++',
      output: [],
      disabled: false
    }
  }
	onChangecode(e) {
		this.setState({
			code: e.target.value
		})
	}

	onChangeinput(e) {
		this.setState({
			input: e.target.value
		})
	}

	onChangelang(e) {
		this.setState({
			lang: e.target.value
		})
	}

	handleClick(e) {
		e.preventDefault();

		this.setState({
			id:71,
			code: '',
			input: '',
			lang: 'c++',
			output: []
		})
	}
	onSubmit(e) {
		e.preventDefault();

		const proc = {
			code : this.state.code,
			input : this.state.input,
			lang : this.state.lang
		}

		this.setState({
			disabled: true
		})

		axios({
		    "method":"GET",
		    "url":"https://judge0.p.rapidapi.com/languages",
		    "headers":{
			    "content-type":"application/octet-stream",
			    "x-rapidapi-host":"judge0.p.rapidapi.com",
			    "x-rapidapi-key":"61a3d56095mshc8da56ba97370cdp1a67bcjsn255358620eb0",
			    "useQueryString":true
			    }
		    })
	 	    .then((response)=>{
	 	    	var y = proc["lang"].toLowerCase();
	 	    	console.log(y)
	    		response.data.forEach(ele => {
			      	var x = ele.name.toLowerCase();
			      	var n = x.includes(y);
			      	if(n===true)
			      	{
			      		this.setState({
			      			id: ele.id
			      		})
			      	}
		      	})
		    	axios({
				    "method":"POST",
				    "url":"https://judge0.p.rapidapi.com/submissions",
				    "headers":{
					    "content-type":"application/json",
					    "x-rapidapi-host":"judge0.p.rapidapi.com",
					    "x-rapidapi-key":"61a3d56095mshc8da56ba97370cdp1a67bcjsn255358620eb0",
					    "accept":"application/json",
					    "useQueryString":true
					    },
				    "data":{
				    	"language_id":this.state.id,
				    	"source_code":proc["code"],
    					"stdin":proc["input"]
				    	}
					})
					.then((response)=>{
			    	console.log(response.data.token)
			    	const date = Date.now();
	                const milliseconds=2000;
	                let currentDate = null;
	                do {
	                    currentDate = Date.now();
	                } while (currentDate - date < milliseconds);
			    	axios({
					    "method":"GET",
					    "url":"https://judge0.p.rapidapi.com/submissions/" + response.data.token,
					    "headers":{
						    "content-type":"application/octet-stream",
						    "x-rapidapi-host":"judge0.p.rapidapi.com",
						    "x-rapidapi-key":"61a3d56095mshc8da56ba97370cdp1a67bcjsn255358620eb0",
						    "useQueryString":true
					    	}
					    })
					    .then((response)=>{
					      console.log(response.data)
					      var list =[]
					      list.push(response.data)
					      var finalobj = new String();
					      list.forEach((element) =>{
					      	if(proc["lang"] === "python" )
					      	{
					      		if(element.stderr == null)
					      			finalobj["stdout"] = element.stdout
					      		else
					      			finalobj["stdout"] = element.stderr
					      	}
					      	else
					      	{
						      	if(element.compile_output == null)
						      		finalobj["stdout"] = element.stdout
						      	else
						      		finalobj["stdout"] = element.compile_output
					      	}
					      })
					      var finallist = [];
					      if(finalobj["stdout"] !== null)
					      	finallist = finalobj["stdout"].split('\n');
					      else
					      {
					      	finalobj["stdout"] = "Compiled and run";
					      	finallist = finalobj["stdout"].split('\n')
					      } 
					      this.setState({
					      	output : finallist,
					      	disabled: false
					      })
					    })
					    .catch((error)=>{
					    	var finalobj = new String();
					    	finalobj["stdout"] = "Error!!"
					    	var finallist = []
					    	finallist = finalobj["stdout"].split('\n');
					    	this.setState({
					    		output : finallist,
					    		disabled: false
					    	})
					      console.log(error)
					    })
				    })
				    .catch((error)=>{
				    	var finalobj = new String();
				    	finalobj["stdout"] = "Error!!"
				    	var finallist = []
				    	finallist = finalobj["stdout"].split('\n');
				    	this.setState({
				    		output : finallist,
				    		disabled: false
				    	})
				      console.log(error)
				    })
	 		    })
		    	.catch((error)=>{
		    		var finalobj = new String();
			    	finalobj["stdout"] = "Error!!"
			    	var finallist = []
			    	finallist = finalobj["stdout"].split('\n');
			    	this.setState({
			    		output : finallist,
			    		disabled: false
			    	})
		      	console.log(error)
		    })		

	this.setState({
	  id: 71,
      code: proc["code"],
      input: proc["input"],
      lang: proc["lang"],
      output: [],
    })
}

  render() {
    return (
    	<div>
			<div className="container">
				<div className="row-mt-5">
					<div className="col-sm-10">
						<h1 className="text-center">Online IDE</h1>
					</div>
				</div>
			</div>
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label>Select Language</label>
					<select
						required
						className="form-control"
						value={this.state.lang}
						onChange={this.onChangelang}>
					<option value="c++">c++</option>
					<option value="python">python</option>
					</select>
				</div>
				<div className="form-group">
					<label>Write Your Code </label>
					<textarea
						required
						className="form-control"
						value={this.state.code} 
						rows="10" cols="50" 
						onChange={this.onChangecode}
						/>
				</div>
				<div className="form-group">
					<label>Enter Your Input </label>
					<textarea className="form-control" 
					value={this.state.input} 
					rows="10" cols="50"
					onChange={this.onChangeinput} 
					/>
				</div>
				<div className="form-group">	
					<input disabled ={this.state.disabled} type="submit" className="btn btn-success" value="Run Code" />
				</div>
			</form>
			<div>
				<button disabled={this.state.disabled} className="btn btn-primary" onClick = {(e) => this.handleClick(e)}>Clear</button>
			</div>
			<div className="container">
	            <div className="row-mt-5">
	                <div className="col-sm-10">
	                    <h1 className="text-center">Output</h1>
	                </div>
	            </div>
	            <div>
	            {
	            	this.state.output.map((out,i) => {
	            		return (
	            			<div key={i}>
	            				<h4>{out}</h4>
	            			</div>
	            		)
	            	})
	            }
	            </div>
	        </div>
		</div>
    )
  }
}
