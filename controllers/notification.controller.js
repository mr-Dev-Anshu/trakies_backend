import Notification from "../models/Notification.js";
import SeenNotification from "../models/SeenNotification.js";

export const createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(200).json(newNotification);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Something went wrong with getExpanse ");
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { email, notificationId } = req.body;
    if (!email || !notificationId) {
      res.status(400).json("Please provide the phone and notification id ");
    }
    const newSeenNotification = await SeenNotification.create({
      email,
      notificationId,
    });
    res.status(200).json({ newSeenNotification });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Something went wrong with getExpanse ");
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;
    if (!email) {
      return res.status(400).json("Please provide the phone number");
    }
    const skip = (page - 1) * limit;

    const notifications = await Notification.find()
      .skip(skip)
      .limit(parseInt(limit));

    const seenNotifications = await SeenNotification.find({ email }).select(
      "notificationId"
    );

    const seenNotificationIds = seenNotifications.map((sn) =>
      sn.notificationId.toString()
    );

    const result = notifications.map((notification) => {
      return {
        ...notification._doc,
        seen: seenNotificationIds.includes(notification._id.toString()),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Something went wrong with getNotifications");
  }
};