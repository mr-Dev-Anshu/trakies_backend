import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.router.js";
import { putObject } from "./controllers/s3bucket.js";
import memberRouter from "./router/member.router.js";
import postRouter from "./router/post.router.js";
import imageRouter from "./router/image.router.js";
import cors from "cors";
// import  TourRouter  from "./router/tour.router.js";
import TrackLeadRouter from "./router/trackLead.router.js";
import ExpanseRouter from "./router/expanse.router.js";
import TourRouter from "./router/tour.js";
import NotificationRouter from "./router/notification.js";
import checkPointRouter from "./router/checkPoint.router.js";
import checkedPointRouter from "./router/checkedPoint.router.js";
import includedRouter from "./router/Included.js";
import notIncludedRouter from "./router/notIncluded.js";
import bookingRouter from "./router/booking.router.js";
import baggageRouter from "./router/checkInBaggage.js";
import backpackRouter from "./router/backPack.js";
import notesRouter from "./router/notes.js";
import interestedRouter from "./router/interested.router.js";
import allocatedAccommodation from "./router/allocatedAccommodation.js"
import accommodation from "./router/accommodation.router.js";
import transportRouter from "./router/transport.router.js" ; 
import boardingPointRouter from "./router/boardingPoints.router.js" ; 
import allocatedTransportRouter from "./router/allocatedTransport.js"
import { cloneTour } from "./controllers/clone.controler.js";
import { checkAdminRole } from "./middleware/checkAdminRole.js";
import adminRouter from './router/auth.js'
import FAQRouter from './router/faq.router.js';
const app = express();
app.use(express.json());

dotenv.config({
  path: "./.env",
});

const allowedOrigins = [
  'http://localhost:3000',
  'https://master.d16q2xfz9dm6yw.amplifyapp.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use('/api/admin' , adminRouter)
app.use("/api/users" , userRouter) ; 
app.use("/api/tour", TourRouter);
app.use("/api/member", memberRouter);
app.post("/api/putObject", putObject);
app.get("/api/clone-tour" , checkAdminRole ,  cloneTour)
app.use("/api/Post", postRouter);
app.use("/api/image", imageRouter);
app.use("/api/lead", TrackLeadRouter);
app.use("/api/expanse", ExpanseRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api", checkPointRouter);
app.use("/api/checked", checkedPointRouter);
app.use("/api/included", includedRouter);
app.use("/api/notIncluded", notIncludedRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/baggage", baggageRouter);
app.use("/api/backpack", backpackRouter);
app.use("/api/notes", notesRouter);
app.use("/api/interested", interestedRouter);
app.use("/api/allocated", allocatedAccommodation);
app.use("/api/accommodation", accommodation);
app.use("/api/transport" , transportRouter) ; 
app.use("/api/board",boardingPointRouter)
app.use("/api/allocatedTransport" , allocatedTransportRouter) ; 
app.use("/api/faq", FAQRouter);
export { app };