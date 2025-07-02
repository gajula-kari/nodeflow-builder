import { PipelineToolbar } from "./pipelineToolbar";
import { PipelineUI } from "./pipelineUI";
import { SubmitButton } from "./submitButton";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
