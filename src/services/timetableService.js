import API from "./api";

export const getTimetable = () => API.get("/timetable");
export const addClass = (data) => API.post("/timetable", data);