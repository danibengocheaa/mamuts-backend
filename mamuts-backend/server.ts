import express, { Application } from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import exerciciRoutes from "./routes/exerciciRoutes";
import routineRoutes from "./routes/routineRoutes";
import dietaRoutes from "./routes/dietaRoutes";
import progressPhotoRoutes from "./routes/progressPhotoRoutes";
import path from 'path';
import db from "./database/connection";


class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    user: "/user",
    exercici: "/exercici",
    routine: "/rutina",
    dieta: "/dieta",
    progressPhoto: "/progress",
  };

  constructor() {
    this.app = express();
    this.port = "8000";

    this.dbConnection();
    this.middlewares();

    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
      await db.sync({ force: false });
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors({
      origin: true, // o especifica tu dominio frontend
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    

    //Lectura del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.user, userRoutes);
    this.app.use(this.apiPaths.exercici, exerciciRoutes);
    this.app.use(this.apiPaths.routine, routineRoutes);
    this.app.use(this.apiPaths.dieta, dietaRoutes);
    this.app.use(this.apiPaths.progressPhoto, progressPhotoRoutes);
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running  on port " + this.port);
    });
  }
}

export default Server;