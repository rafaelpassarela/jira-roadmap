import QueryStringContextProvider from "../../../contexts/QueryStringContext";
import DashConfigPage from "./DashConfigPageComponent";

export default function DashConfigView() {
    return (
        <QueryStringContextProvider>
            <DashConfigPage />
        </QueryStringContextProvider>
    );
}