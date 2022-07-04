import React, {MutableRefObject, useState} from 'react';


function MainContent() {
    const [state, setState] = useState({
        fileName: '',
        user: '',
        language: '',
    });

    const [github, setGithub] = useState<gitApi<any> | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [queryApi, setQueryApi] = useState<string | undefined>();
    const [modal, setModal] = useState<modalType<unknown>>({
        isOpen: false,
        avatar_url: ''
    });

    interface modalType<modalOpen> {
        isOpen: boolean | MutableRefObject<boolean> | React.MutableRefObject<boolean>;
        avatar_url: string | unknown;
    }


    interface gitApi<Response> {
        map: Function;
        id: string | number,
        name: string,
        html_url: string;
        description: string | null
        repository: {
            owner: {
                login: string,
                avatar_url: string,
            },
        }
    }


    const handleChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    };

    const API = 'https://api.github.com/search/code?q=';
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
                setQueryApi(url);
                return setGithub(data.items)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            });
    }


    // const changeNumberOfPages = async (event: React.FormEvent<HTMLSelectElement>) => {
    //     event.preventDefault();
    //     setState({
    //         ...state,
    //         perPage: Number(event.currentTarget.value),
    //         page: 1,
    //     })
    //     setQueryApi(`${queryApi} per_page:${event.currentTarget.value} page:${1}`)
    //     await fetch(encodeURIComponent(`${queryApi}`), {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //                 console.log(queryApi)
    //                 return setGithub(data.items)
    //             }
    //         )
    // }


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
                    <form>
                        <div className={"input-group"}>
                            <select id="perPage" name="perPage" className={"form-select"}
                                // onChange={changeNumberOfPages}
                            >
                                <option value="">Select per page</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </form>
                </div>
                {/*<div className={"row"}>*/}

                {/*    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">*/}
                {/*        Launch modal*/}
                {/*    </button>*/}
                {/*    <div className="modal" tabIndex={-1} id={"modal"}>*/}
                {/*        <div className="modal-body">*/}
                {/*            {github && <img id="modal"*/}
                {/*                            src={github?.repository?.owner?.avatar_url}*/}
                {/*            />}*/}
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
                        {github && github.map((item: gitApi<Response>, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name} <a rel="noreferrer" href={item.html_url} target={"_blank"}> <i
                                            className="fa-solid fa-link"></i> </a></td>
                                        <td>
                                            {item.repository.owner.login}
                                            {/*<button onClick={(e) =>{*/}
                                            {/*    setModal(e.modal.isOpen =>  {*/}
                                            {/*        !modal.isOpen*/}
                                            {/*    })*/}
                                            {/*    }}>*/}
                                            {/*    Avatar Modal*/}
                                            {/*</button>*/}
                                            {item.repository.owner.avatar_url &&
                                                <img src={item.repository.owner.avatar_url} width={100} height={100}/>}
                                        </td>

                                        <td>{item.description}</td>
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
