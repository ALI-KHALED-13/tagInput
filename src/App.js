import { useState } from "react";

const App =()=>{
    const [isFocused, setIsFocused] = useState(false);
    const [tagInp, setTagInp] = useState('');
    const [savedTags, setSavedTags] = useState(['CSS']);
    const [tagsChosen, setTagsChosen] = useState([]);

    const handleChange =(ev)=>{
        if (ev.target.value === ' ') return; // to avoid storing /s
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
            const tagTxt = ev.target.className !== 'suggestion'? tagInp : ev.target.textContent;
            if (tagsChosen.indexOf(tagTxt) >= 0) return setTagInp(''); //if already added

            if (savedTags.indexOf(tagTxt) === -1) setSavedTags([...savedTags, tagTxt]);

            setTagsChosen([...tagsChosen, tagTxt]);

            setTagInp('');
        }
    }
    const removeFromBag =(ev)=> {
        setTagsChosen(tagsChosen.filter(tag=> tag !== ev.target.previousElementSibling.textContent))
    }
    return (
        <main>
            <h2>Tags</h2>
            <p>Select Time for your event</p>
            <section>
                <div id="tagsBag">
                    {tagsChosen.map((tag, ind)=> (
                        <div className="tag" key={Date.now() + ind}>
                            <p>{tag}</p> <span className="del" onClick={removeFromBag}>X</span>
                        </div>)
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