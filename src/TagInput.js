import { useState } from "react"
import removeSign from './xsign.png';

const TagInput =({savedTags, saveTag})=>{
    const [isFocused, setIsFocused] = useState(false);
    const [tagInp, setTagInp] = useState('');
    const [addedTags, setAddedTags] = useState([]);

    const handleChange =(ev)=>{
        if (ev.target.value === ' ') return; // to avoid storing /s
        if (!isFocused) setIsFocused(true);
        
        setTagInp(ev.target.value.trim().toUpperCase());
    }
    
    const addToBag =(ev)=>{
        if (!tagInp) return;
        
        if ( !ev.key || ev.key === 'Enter' || (ev.key === ' ' || ev.keyCode === 229)){
            const tagTxt = ev.target.className !== 'suggestion'? tagInp : ev.target.textContent; //async setTagInp
            if (addedTags.indexOf(tagTxt) >= 0) return setTagInp(''); //if already added reset

            saveTag(tagTxt);

            setAddedTags([...addedTags, tagTxt]);

            return setTagInp('');
        }
        
    }

    const removeFromBag =(ev)=> {
        setAddedTags(addedTags.filter(tag=> tag !== ev.target.previousElementSibling.textContent));
    }

    const insertSuggestions =()=> { 
        if (!tagInp) return;

        const hints = savedTags.filter(tag=> tag.startsWith(tagInp));
        
        if ( !hints.length ) return <button className="add" onClick={addToBag}>+</button>;
        
        return <div id="suggestions"> {hints.map((tag, ind)=> {
          return <div className="suggestion" key={Date.now() + ind} onClick={addToBag}>{tag}</div>;
        }) } </div>
    }

    return (
        <section>

            <div id="tagsBag">
                {
                    addedTags.map((tag, ind)=> {
                        return (
                            <div className="tag" key={Date.now() + ind}>
                                <p>{tag}</p> 
                                <img alt="del" src={removeSign} className="del" onClick={removeFromBag} />
                            </div>
                        )
                    })
                }

                <input 
                    placeholder="Add Tags" 
                    onBlur={()=> setTimeout(()=>setIsFocused(false), 300)}
                    value={tagInp}
                    onFocus={()=> setIsFocused(true)}
                    onChange={handleChange}
                    onKeyUp={addToBag}
                />
            </div>

                {
                    isFocused && insertSuggestions()
                }
            
        </section>
    );
}
export default TagInput;