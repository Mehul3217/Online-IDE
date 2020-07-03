import React from 'react';
import './home.component.css'
import c1 from './c1.jpeg'
import c2 from './c2.jpeg'
import c3 from './c3.webp'
import c4 from './c4.jpeg'

const txt1 = ['THE PERFECT PLAYGROUND TO PRACTICE YOUR CODING INTERVIEW QUESTIONS','HIGHLY QUALIFIED MENTORS HIGHLY QUALIFIED MENTORS FROM LEADING TECH GIANTS','250 handpicked questions for coding interviews in leading companies','FINAL TOUCH WITH COMPANY SPECIFIC MOCK TESTS'];
const txt2 = ['The Perfect Playground','Highly Qualified Mentors','Question Library','Mock Test']
const img = [c1,c2,c3,c4];
const cls = ['btn1','btn1-active'];
let ind = 0;

class  Home extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = ({
            text1 : 'THE PERFECT PLAYGROUND TO PRACTICE YOUR CODING INTERVIEW QUESTIONS',
            image : c1,
            text2 : 'The Perfect Playground',
            cl0 : cls[0],
            cl1 : cls[0],
            cl2 : cls[0],
            cl3 : cls[0]
        })
    }

    changevalue(e,val) {
        ind = val;
        if(val === 0)
        {
            this.setState({
                text1 : txt1[0],
                text2 : txt2[0],
                image : img[0],
                cl0 : cls[1],
                cl1 : cls[0],
                cl2 : cls[0],
                cl3 : cls[0]
            })
        }
        else if(val === 1)
        {
            this.setState({
                text1 : txt1[1],
                text2 : txt2[1],
                image : img[1],
                cl0 : cls[0],
                cl1 : cls[1],
                cl2 : cls[0],
                cl3 : cls[0]
            })
        }
        else if(val === 2)
        {
            this.setState({
                text1 : txt1[2],
                text2 : txt2[2],
                image : img[2],
                cl0 : cls[0],
                cl1 : cls[0],
                cl2 : cls[1],
                cl3 : cls[0]
            })
        }
        else if(val === 3)
        {
            this.setState({
                text1 : txt1[3],
                text2 : txt2[3],
                image : img[3],
                cl0 : cls[0],
                cl1 : cls[0],
                cl2 : cls[0],
                cl3 : cls[1]
            })
        }
    }
    
    componentDidMount() {
        this.timeout = setInterval((e) => {
            this.changevalue(e,ind)
            ind = (ind+1)%4
        },1000);
    }

    componentWillUnmount() {
        if(this.interval){
            clearInterval(this.timeout);
        }
    }

    render () {
        return (
            <div>
                <div className="display">
                    <div className="left">
                        Master Your 
                        <br/>
                        Destiny With
                        <br/>
                        <strong>Placement Saga</strong>
                        <br/>
                        <div className="foo">
                            <a href="#">
                                View Sample Question
                            </a>
                        </div>
                    </div>
                    <div className="right">
                        <div className="homeicon2">
                            <div>
                            <img src={this.state.image} alt="good" className="img-class"/>
                            </div>
                            <div className="a">
                                {this.state.text2}
                            </div>
                        </div>
                        <div className="homeicon3">
                            {this.state.text1}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <div className={this.state.cl0} onClick={(e) => this.changevalue(e,0)}>
                    </div>
                    <div className={this.state.cl1} onClick={(e) => this.changevalue(e,1)}>
                    </div>
                    <div className={this.state.cl2} onClick={(e) => this.changevalue(e,2)}>
                    </div>
                    <div className={this.state.cl3} onClick={(e) => this.changevalue(e,3)}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

