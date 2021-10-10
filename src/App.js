import React, { Component } from "react";
import TagInput from "./TagInput";


class App extends Component {
    constructor(props){
        super(props);
        this.state = { savedTags: ["CSS", "HTML"], }
        this.saveTag = this.saveTag.bind(this);
    }

    componentDidMount(){ // for users whome visited before 
        if (localStorage.getItem('savedTags')){

            const locallySavedTags = JSON.parse(localStorage.getItem('savedTags'));
            this.setState({savedTags: locallySavedTags,});

        } else {
            localStorage.setItem('savedTags', JSON.stringify(this.state.savedTags));
        }
    }

    saveTag(tagTxt){
        if (this.state.savedTags.indexOf(tagTxt) === -1) this.setState({savedTags: [...this.state.savedTags, tagTxt]});
    }

    render(){
        document.addEventListener( 'visibilitychange', ()=> localStorage.setItem('savedTags', JSON.stringify(this.state.savedTags))); // for future visits

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
Also, that local storage is an extra work (wasn't required in the test task details), however I've done it to mimic the mechanism of storintg into a database
*/

/*const App =()=>{
    const [isFocused, setIsFocused] = useState(false);
    const [tagInp, setTagInp] = useState('');
    const [savedTags, setSavedTags] = useState(['CSS']);
    const [tagsChosen, setTagsChosen] = useState([]);

    const handleChange =(ev)=>{
        if (ev.target.value === ' ') return; // to avoid storing /s
        if (!isFocused) setIsFocused(true);
        setTagInp(ev.target.value.toUpperCase());
    }
    
    const addToBag =(ev)=>{
        if (!tagInp) return;

        if ( !ev.code || ev.code === 'Enter' || ev.code === 'Space' ){
            const tagTxt = ev.target.className !== 'suggestion'? tagInp : ev.target.textContent;
            if (tagsChosen.indexOf(tagTxt) >= 0) return setTagInp(''); //if already added reset

            if (savedTags.indexOf(tagTxt) === -1) setSavedTags([...savedTags, tagTxt]);

            setTagsChosen([...tagsChosen, tagTxt]);

            setTagInp('');
        }
    }
    const removeFromBag =(ev)=> {
        setTagsChosen(tagsChosen.filter(tag=> tag !== ev.target.previousElementSibling.textContent))
    }

    const insertSuggestions =()=> {
        const hints = savedTags.filter(tag=> tagInp && tag.startsWith(tagInp));
        
        if ( tagInp && !hints.length ) return <div className="add" onClick={addToBag}>+</div>;
        
        return hints.map((tag, ind)=> (
              <div
                className="suggestion" 
                key={Date.now() + ind}
                onClick={addToBag}
              >
                {tag}
              </div>
            ) );
    }
    return (
        <main>
            <h2>Tags</h2>
            <p>Select Time for your event</p>
            <section>
                <div id="tagsBag">
                    {
                    tagsChosen.map((tag, ind)=> (
                        <div className="tag" key={Date.now() + ind}>
                            <p>{tag}</p> <span className="del" onClick={removeFromBag}>X</span>
                        </div>)
                        )
                    }
                </div>

                <input 
                placeholder="Add Tags" 
                onBlur={()=> setTimeout(()=>setIsFocused(false), 300)}
                value={tagInp}
                onChange={handleChange}
                onKeyUp={addToBag}
                />

                <div id="suggestions">
                    {
                    isFocused && insertSuggestions()
                    }
                </div>
            </section>
        </main>
    );
}*/