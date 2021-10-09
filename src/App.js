import { useState } from "react";

const App =()=>{
    const [isFocused, setIsFocused] = useState(false);
    const [tagInp, setTagInp] = useState('');
    const [tagsChosen, setTagsChosen] = useState([]);

    const [savedTags, setSavedTags] = useState(['CSS']);

    const handleChange =(ev)=>{
        if (!isFocused) setIsFocused(true);
        setTagInp(ev.target.value.toUpperCase());
    }
    
    const insertSuggestions =()=> {
        const hints = savedTags.filter(tag=> tagInp && tag.startsWith(tagInp));
        
        if (!hints.length && tagInp) return <div className="add" onClick={addToBag}>+</div>
        
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
    const addToBag =(ev)=>{
        if (!tagInp) return;
        if (!ev.code || (ev.code === 'Enter' || ev.code === 'Space')){
            if (tagsChosen.indexOf(tagInp) >= 0) return setTagInp('');

            setSavedTags([...savedTags, tagInp]);

            setTagsChosen([...tagsChosen, tagInp]);

            setTagInp('');
        }
    }
    return (
        <main>
            <h2>Tags</h2>
            <p>Select Time for your event</p>
            <section>
                <div id="tagsBag">
                    {tagsChosen.map((tag, ind)=> (
                        <div className="tag" key={Date.now() + ind}>{tag} <span className="del">X</span></div>)
                    )}
                </div>

                <input 
                placeholder="Add Tags" 
                onBlur={()=> setTimeout(()=>setIsFocused(false), 200)}
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
}

export default App;