import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { StudentService } from "../Service/StudentService";
import { resp } from "../utils/resp";
import { Student } from "../interfaces/Student";
require('dotenv').config()

export class StudentController extends Contorller {
    protected service: StudentService;

    constructor() {
        super();
        this.service = new StudentService();
    }

    public async create(Request: Request, Response: Response) {
        const res: resp<Student|undefined> = await this.service.create(Request.body);
        Response.status(res.code).send(res);
    }

    public async read(Request: Request, Response: Response) {
        const res: resp<Array<Student>|undefined> = await this.service.read();
        Response.status(res.code).send(res);
    }

    public async update(Request: Request, Response: Response) {
        const res: resp<Student|undefined> = await this.service.update(Request.body);
        Response.status(res.code).send(res);
    }

    public async delete(Request: Request, Response: Response) {
        const res: resp<Student|undefined> = await this.service.delete(Request.query.Student_ID as string);
        Response.status(res.code).send(res);
    }

    public async findUngraded(Request: Request, Response: Response) {
        const res: resp<Array<Student> | undefined> = await this.service.findUngraded();
        Response.status(res.code).send(res);
    }
}