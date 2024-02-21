import successSvg from "../assets/icons/success.svg";
import closeSvg from "../assets/icons/close.svg";
import failureSvg from "../assets/icons/failed.svg";
const NotificationModal = ({isVisible,onClose,notificationMessage, notificationType}) => {
    if(!isVisible) return null;
    return (
     <div className="fixed inset-0 bg-black bg-opacity-50 modal">
         <div className="flex items-center justify-center h-[100vh] ">
      <div className="bg-white rounded-lg w-[85%] md:w-[30%] grid max-h-[80%] md:max-h-[90%]">
          <img src={closeSvg} alt="" className="justify-self-end mb-4 text-red mx-5 mt-4" onClick={()=>onClose()}/>
          <div className="flex justify-center ">
              <img src={notificationType === 'success' ? successSvg : failureSvg} alt="" className="h-16 rounded-lg object-fit"/>
          </div>
          <p className="text-lg md:text-xl text-primary font-medium mt-3 text-center mb-6 px-2 mx-1 mx-md-5">{notificationMessage}</p>
          <div className="flex items-center justify-center mb-8">
              <button className="bg-primary text-white px-8 py-2 rounded font-bold text-lg hover:scale-105" onClick={()=>onClose()}>OK</button>
          </div>
      </div>
  </div>
     </div>
      );
}
 
export default NotificationModal;