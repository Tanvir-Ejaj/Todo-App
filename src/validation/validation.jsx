import * as Yup from "yup";

export const Todo = Yup.object({
    taskAdder: Yup.string().min(1).required("Please Add A Task"),
});
