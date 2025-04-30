import { Route } from "../abstract/Route"
import { StudentController } from "../controller/StudentController";

export class StudentRoute extends Route{
    
    protected url: string;
    protected Contorller = new StudentController();

    constructor(){
        super()
        this.url = '/Student/'
        this.setRoutes()
    }

    protected setRoutes(): void {

        this.router.post(`${this.url}create`,(req, res)=>{
            this.Contorller.create(req, res);
        })

        this.router.get(`${this.url}read`,(req, res)=>{
            this.Contorller.read(req, res);
        })

        this.router.patch(`${this.url}update`,(req, res)=>{
            this.Contorller.update(req, res);
        })

        this.router.delete(`${this.url}delete`,(req, res)=>{
            this.Contorller.delete(req, res);
        })

        this.router.get(`${this.url}findUngraded`,(req, res)=>{
            this.Contorller.findUngraded(req, res);
        })
        
    }
}