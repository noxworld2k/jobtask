import React, {useState} from 'react';


function MainContent() {
    const [state, setState] = useState({
        fileName: '',
        user: '',
        language: '',
    });
    const [github, setGithub] = useState<FileName<any>>();

    interface FileName<Response> {
        map: Function;
        id: string | number,
        name: string,
        html_url: string;
        repository: {
            owner: {
                login: string,
                avatar_url: string,
            },
            description: string | null
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    };


    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const url = API + `${state.fileName} in:file user:${state.user} language:${state.language}`;
        console.log(url);
        fetch(url,
            {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                return setGithub(data.items)
            })
            .catch(error => console.log(error));

    }


    const API = 'https://api.github.com/search/code?q=';


    return (
        <>
            <div className={"container mt-5"}>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className={"input-group"}>
                            <span className={"input-group-text"}><i className="fa-solid fa-file"></i></span>
                            <input type="text"
                                   id="fileName"
                                   name="fileName"
                                   className={"form-control"}
                                   placeholder="Enter phrase"
                                   value={state.fileName}
                                   onChange={handleChange}
                                   required={true}
                            />
                            <span className={"input-group-text"}><i className="fa-brands fa-github"></i></span>
                            <input type="text"
                                   id="user"
                                   name="user"
                                   className={"form-control"}
                                   placeholder="username"
                                   value={state.user}
                                   onChange={handleChange}
                                   required={true}
                            />
                            <span className={"input-group-text"}>.</span>
                            <select id="language" name="language" className={"form-select"} onChange={handleChange}>
                                <option value="">Select language</option>
                                <option value="Go">Go</option>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>

                            <button type="submit" className={"btn btn-primary"}>Submit</button>
                        </div>

                    </form>
                </div>
                <div className={"row"}>

                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal" tabIndex={-1} id={"exampleModal"}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                {/*<div className="modal-body" ref={"userAvatarModal"}>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th>File Name</th>
                            <th>User</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {github && github.map((item: FileName<any>, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name} <a rel="noreferrer" href={item.html_url} target={"_blank"}> <i
                                            className="fa-solid fa-link"></i> </a></td>
                                        {/*<td><a data-bs-toggle="modal" data-bs-target="#exampleModal">{item.repository.owner.login}</a></td>*/}

                                        <td>{item.repository.description}</td>
                                    </tr>
                                )
                            }
                        )}

                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}

export default MainContent;
