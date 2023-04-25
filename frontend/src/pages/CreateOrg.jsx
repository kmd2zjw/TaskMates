import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppWrap } from '../Wrapper';


const CreateOrg = () => {
    const state = useLocation().state;
    console.log(state)
    const [name, setName] = useState(state?.name || "");

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          // state
            /*?*/ await axios.post(`/orgs/create`, {
                name,
              })
            // : await axios.post(`/org/create`, {
            //     name,
            //   });
            navigate("/")
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className='createOrg'>
            <h1 className="title-text">Create a New Organization</h1>
            <form className="app__form">
                <input 
                    type="text" required 
                    placeholder='Organization Name'
                    className="app__input" 
                    onChange={(e) => setName(e.target.value)}
                />
            <div className="app__buttons">
                <button className="app__button" onClick={handleClick}>
                  <div className="app__button-text">Create Organization</div></button>
            </div>
            </form>
        </div>
    )
}

export default AppWrap(CreateOrg, 'CreateOrg');