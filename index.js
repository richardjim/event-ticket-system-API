import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import xmlparser from "express-xml-bodyparser";
import Sentry from "@sentry/node";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv/config";


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

const xmlOptions = {
  charkey: "value",
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true,
};

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(fileupload({ useTempFiles: true }));

app.get("/health", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Booking System is running",
  });
});

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Event Ticket Booking API",
      version: "1.0.0",
      description: "API Documentation for the Ticket Booking System",
      contact: {
        name: "Support",
        url: "",
        email: "",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url:
          process.env.ENVIRONMENT === "production" ||
          process.env.ENVIRONMENT === "development"
            ? `${process.env.API_HOST}/api/v1`
            : `${process.env.API_HOST}:${port}/api/v1`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
// swaggerDocs(app);
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api/v1", xmlparser(xmlOptions), routes);
app.use(Sentry.Handlers.errorHandler());

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  res.status(500).send({
    status: "error",
    message: error.message,
  });
});

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger API Docs available at http://localhost:${port}/api-docs`);
  });

export default app;

