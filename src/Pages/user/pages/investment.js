import { useEffect } from "react";

const Investment = ({setPageTitle}) => {
    useEffect(()=>{
        setPageTitle("Investments")
    }, [setPageTitle]);
    return ( 
        <div>
            This is investment
        </div>
     );
}
 
export default Investment;