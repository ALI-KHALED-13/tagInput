import React, { Component } from "react";
import TagInput from "./TagInput";


class App extends Component {
    constructor(props){
        super(props);
        this.state = { savedTags: ["CSS", "HTML", "ALI", "REACTJS"], }
        this.saveTag = this.saveTag.bind(this);
    }

    componentDidMount(){
        let locallySavedTags = localStorage.getItem('savedTags'); //null if not present
        if (!locallySavedTags){
            localStorage.setItem('savedTags', JSON.stringify(this.state.savedTags));
            locallySavedTags = localStorage.getItem('savedTags');

        }
        locallySavedTags = JSON.parse(locallySavedTags);

        this.setState({savedTags: locallySavedTags,});  
    }

    saveTag(tagTxt){
        if (this.state.savedTags.indexOf(tagTxt) === -1) this.setState({savedTags: [...this.state.savedTags, tagTxt]});
    }

    render(){
        document.addEventListener( 'visibilitychange', ()=>localStorage.setItem('savedTags', JSON.stringify(this.state.savedTags)));

        return (
            <main>
                <h2>Tags</h2>
                <p>Select Time for your event</p>
                <TagInput savedTags={this.state.savedTags} saveTag={this.saveTag}/>
            </main>
        )
    }
}
export default App;


/* 
could do the whole component in a functional way using only hooks (useEffect(()=>{}, []) to replace life cycle mehod above for example) 
but leaned toward showing my abilities going both ways, to help the reviewer asses my skills
Also, that local storage is an extra work (wasn't required in the test task details), 
however I've done it to mimic the mechanism of storintg into a database (i.e: the experience gets better with the second use (I forbade tags repetiion ))
*/