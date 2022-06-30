import React, {useState} from 'react';
import {stat} from "fs";


function MainContent() {
    const [state, setState] = useState({
        fileName: '',
        user: '',
        language: '',
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    };

    const handleChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    };
    // const handleSubmit = (event: FormEvent<React.SyntheticEvent>, value: ObjectHTMLAttributes<object> ) => {
    //     event.preventDefault();
    //     console.log(value);
    // }


    const API = 'https://api.github.com/search/code?q=';

    // const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    //
    // }


    // fetch encodeURIComponent(`${API}?q=${state.fileName} user:${state.user} in:file language:${state.language} in:description`)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data) // Prints result from `response.json()` in getRequest
    //     })
    //     .catch(error => console.error(error))


    return (
        <>
            <div>
                <div>
                    <form onSubmit={async (e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const url = API + `${state.fileName} in:file user:${state.user} language:${state.language}`;
                        console.log(url);
                        fetch(url,
                            {
                                method: 'GET',
                            })
                            .then(response => response.json())
                            .then(another => console.log(another))
                            .then(data => {
                                console.log(data) // Prints result from `response.json()` in getRequest
                            })
                    }}

                    >
                        <label htmlFor="fileName">Search Phrase</label>
                        <input type="text"
                               id="fileName"
                               name="fileName"
                               placeholder="Enter phrase"
                               value={state.fileName}
                               onChange={handleChange}
                               required={true}
                        />
                        <label htmlFor="user">Name</label>
                        <input type="text"
                               id="user"
                               name="user"
                               placeholder="Enter username"
                               value={state.user}
                               onChange={handleChange}
                               required={true}
                        />
                        <label htmlFor="language">language</label>
                        <select id="language" name="language" onChange={handleChangeSelect}>
                            <option value="">Select</option>
                            <option value="Go">Go</option>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>

                        <button type="submit">Submit</button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default MainContent;
