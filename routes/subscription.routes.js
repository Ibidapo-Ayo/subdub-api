import { Router } from "express";
import {authorize, userIsAdmin} from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/", userIsAdmin, authorize, getAllSubscriptions
);

subscriptionRouter.get("/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE a subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE a subscription" })
);

subscriptionRouter.get("/users/:id", (req, res) =>
  res.send({ title: "GET user subscriptions" })
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL a subscription" })
);

subscriptionRouter.get("/upcoming-renewels", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
