export interface gitApi<Response> {
    map: Function;
    id: string | number,
    name: string,
    html_url: string;
    repository: {
        owner: {
            login: string ,
            avatar_url: string | null | undefined,
        },
        description: string | null
    }
}