import { Router } from "express";
import bodyParser from 'body-parser'
import { CreateUserController } from "./controllers/users/CreateUserController";
import { LoginUserController } from "./controllers/users/LoginUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
import { CheckSubscriptionController } from "./controllers/users/CheckSubscriptionController";
import { CreateAssignmentController } from "./controllers/assignments/CreateAssignmentController";
import { ListAssignmentController } from "./controllers/assignments/ListAssignmentController";
import { DeleteAssignmentController } from "./controllers/assignments/DeleteAssignmentController";
import { CountAssignmentsController } from "./controllers/assignments/CountAssignmentsController";
import { AssignmentDetailController } from "./controllers/assignments/AssignmentDetailController";
import { UpdateAssignmentController } from "./controllers/assignments/UpdateAssignmentController";
import { NewCustomerController } from "./controllers/customers/NewCustomerController";
import { FindCustomersController } from "./controllers/customers/FindCustomersController";
import { ListCustomersController } from "./controllers/customers/ListCustomersController";
import { GetOneCustomerController } from "./controllers/customers/GetOneCustomerController";
import { RemoveCustomerController } from "./controllers/customers/RemoveCustomerController";
import { UpdateCustomerController } from "./controllers/customers/UpdateCustomerController";
import { NewSchedulingController } from "./controllers/schedulings/NewSchedulingController";
import { ListSchedulingsController } from "./controllers/schedulings/ListSchedulingsController";
import { DeleteScheduleController } from "./controllers/schedulings/DeleteScheduleController";
import { SubscriptionController } from "./controllers/subscriptions/SubscriptionController";
import { WebhooksController } from "./controllers/subscriptions/WebhooksController";
import { CreatePortalController } from "./controllers/subscriptions/CreatePortalController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// ➡️ user routes
router.post("/users", new CreateUserController().handle)
router.post("/session", new LoginUserController().handle)
router.get("/user", isAuthenticated, new DetailUserController().handle)
router.put("/user", isAuthenticated, new UpdateUserController().handle)
router.get("/status", isAuthenticated, new CheckSubscriptionController().handle)

// ➡️ assigment routes
router.post("/assignment", isAuthenticated, new CreateAssignmentController().handle)
router.get("/assignments", isAuthenticated, new ListAssignmentController().handle)
router.delete("/assignment", isAuthenticated, new DeleteAssignmentController().handle)
router.get("/assignmentsnumber", isAuthenticated, new CountAssignmentsController().handle)
router.get("/assignment", isAuthenticated, new AssignmentDetailController().handle)
router.put("/assignment", isAuthenticated, new UpdateAssignmentController().handle)

// ➡️ customer routes
router.post("/customer", isAuthenticated, new NewCustomerController().handle)
router.get("/customers", isAuthenticated, new FindCustomersController().handle)
router.get("/customerlist", isAuthenticated, new ListCustomersController().handle)
router.get("/customer", isAuthenticated, new GetOneCustomerController().handle)
router.delete("/customer", isAuthenticated, new RemoveCustomerController().handle)
router.put("/customer", isAuthenticated, new UpdateCustomerController().handle)

// ➡️ scheduling routes
router.post("/schedule", isAuthenticated, new NewSchedulingController().handle)
router.get("/schedule", isAuthenticated, new ListSchedulingsController().handle)
router.delete("/schedule", isAuthenticated, new DeleteScheduleController().handle)

// ➡️ subscription routes
router.post("/subscribe", isAuthenticated, new SubscriptionController().handle)
router.post("/webhooks", bodyParser.raw({ type: 'application/json' }), new WebhooksController().handle)
router.post("/create-portal", isAuthenticated, new CreatePortalController().handle)

export { router };