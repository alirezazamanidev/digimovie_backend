
import { IUser } from "../interfaces"


declare global {
    namespace Express {
        interface Request {
            user?:IUser
        }
    }
}

declare module "express-serve-static-core" {
    export interface Request {
        user?: IUser
    }
}
