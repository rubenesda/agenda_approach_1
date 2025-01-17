type EventData = {
  title: string;
  start: string;
  time: string;
  color: string;
  email?: string;
};

type LoginData = {
  email: string;
  password: string;
}

type AccountData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

type APIResponse = {
  success: string;
  message: string;
};

type NotificationData = {
  title: string;
  dateTime: string;
};