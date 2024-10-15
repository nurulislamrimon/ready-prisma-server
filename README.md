# Notice
## Express Request issue will crash your server
While you used this server architechture to initiate your server, make sure type issue resolved from default express types. 

Path: node_modules/@types/express/index.d.ts
line: Maybe - 106 - 113
`
 interface Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>,
    > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
        user?:{email:string;role:string}, uploadedFolder?:string
    }
`
