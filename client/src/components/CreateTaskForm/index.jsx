import { useState } from "react";

function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // const dispatch = useDispatch();
  // const projectId = useSelector((state) => state.projectDetailsById.project._id);

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(createTask(projectId, { title, description }));
    setSubmitted(true);
    // reset form fields
    setTitle("");
  };

  if (submitted) {
    return null; // Return null to hide the form
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default CreateTaskForm