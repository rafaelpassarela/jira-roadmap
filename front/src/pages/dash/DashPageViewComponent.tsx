import QueryStringContextProvider from "../../contexts/QueryStringContext";
import DashPageList from "./DashPageListComponent";

export default function DashPage() {

    return (
        <QueryStringContextProvider>
            <DashPageList />
        </QueryStringContextProvider>
    );
}