import React, {useState} from 'react';


function MainContent() {
    const [state, setState] = useState({
        fileName: '',
        user: '',
        language: '',
    });
    const [github, setGithub] = useState<FileName<any> | undefined>();
    const [error, setError] = useState<string | undefined>();

    interface FileName<Response> {
        map: Function;
        id: string | number,
        name: string,
        html_url: string;
        repository: {
            owner: {
                login: string,
                avatar_url: string | null | undefined,
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
        const response = await fetch(url);
        if (!response.ok) {
            setError(`Error! status: ${response.status}`);
        }
        console.log(url);
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                return setGithub(data.items)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            });
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
                {/*<div className={"row"}>*/}

                {/*    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">*/}
                {/*        Launch demo modal*/}
                {/*    </button>*/}
                {/*    <div className="modal" tabIndex={-1} id={"modal"}>*/}
                {/*        <div className="modal-dialog">*/}
                {/*            <div className="modal-content">*/}

                {/*                <div className="modal-body">*/}
                {/*                    <img ref={github.repository.owner.avatar_url}/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}
                    {error && <div className={"alert alert-danger"}>{error}</div>}
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
                                        <td><button data-bs-toggle="modal"
                                               data-bs-target="#modal">{item.repository.owner.login}</button></td>

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
