import { Spinner } from "@chakra-ui/spinner";
import "../../styles/components.css";

export default function LoadingSpinner(){

  console.log("loading");
  
    return (
        <div className="flex justify-center items-center h-[80vh]">
    <div className="loading-skeleton">
      <Spinner
        thickness="20px"
        speed="0.65s"
        emptyColor="blue.200"
        color="blue.500"
        size="xl"
        className="scale-150"
      />
    </div>
  </div>);
}