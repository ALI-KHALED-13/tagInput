import { useState } from "react"

const TagInput =({savedTags, saveTag})=>{
    const [isFocused, setIsFocused] = useState(false);
    const [tagInp, setTagInp] = useState('');
    const [addedTags, setAddedTags] = useState([]);

    const handleChange =(ev)=>{
        if (ev.target.value === ' ') return; // to avoid storing /s
        if (!isFocused) setIsFocused(true);
        
        setTagInp(ev.target.value.toUpperCase());
    }
    
    const addToBag =(ev)=>{
        if (!tagInp) return;

        if ( !ev.code || ev.code === 'Enter' || ev.code === 'Space' ){
            const tagTxt = ev.target.className !== 'suggestion'? tagInp : ev.target.textContent; //async setTagInp
            if (addedTags.indexOf(tagTxt) >= 0) return setTagInp(''); //if already added reset

            saveTag(tagTxt);

            setAddedTags([...addedTags, tagTxt]);

            setTagInp('');
        }
    }

    const removeFromBag =(ev)=> setAddedTags(addedTags.filter(tag=> tag !== ev.target.previousElementSibling.textContent));

    const insertSuggestions =()=> { 
        if (!tagInp) return;

        const hints = savedTags.filter(tag=> tag.startsWith(tagInp));
        
        if ( !hints.length ) return <div className="add" onClick={addToBag}>+</div>;
        
        return hints.map((tag, ind)=> <div className="suggestion" key={Date.now() + ind} onClick={addToBag}> {tag} </div>);
    }

    return (
        <section>

            <div id="tagsBag">
                {
                    addedTags.map((tag, ind)=> {
                        return (
                            <div className="tag" key={Date.now() + ind}>
                                <p>{tag}</p> <span className="del" onClick={removeFromBag}>X</span>
                            </div>
                        )
                    })
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
    );
}
export default TagInput;