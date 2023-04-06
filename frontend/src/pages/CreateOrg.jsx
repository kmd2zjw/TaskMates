import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
//import './Home.scss';
const CreateOrg = () => {
    const state = useLocation().state;
    const [name, setName] = useState(state?.name || "");

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          state
            ? await axios.put(`/posts/${state.id}`, {
                name,
              })
            : await axios.post(`/posts/`, {
                name,
              });
              navigate("/organizations")
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className='createOrg'>
            <h1>Create a New Organization!</h1>
            <form>
                <input 
                    type="text" required 
                    placeholder='Organization Name' 
                    onChange={(e) => setName(e.target.value)}
                />
            <div className="buttons">
                <button onClick={handleClick}>Create Organization</button>
            </div>
            </form>
        </div>
    )
}

export default CreateOrg