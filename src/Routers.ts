import {Route} from "./abstract/Route";
import { PageRoute } from "./routers/pageRoute";
import { StudentRoute } from "./routers/StudentRoute";

export const router: Array<Route> = [
    new PageRoute(),new StudentRoute()
];

