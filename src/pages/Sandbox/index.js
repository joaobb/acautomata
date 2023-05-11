import { BasePageContent } from "../../components/Base/PageContent";
import AutomataBuilder from "../../components/Builder";
import "./index.css";

const SandboxPage = () => {
  return (
    <div className="sandbox__container">
      <BasePageContent>
        <AutomataBuilder />
      </BasePageContent>
    </div>
  );
};

export default SandboxPage;
