import Swal from "sweetalert2";
import { getImageUrl } from "../../../utils/getImageUrl";
import defaultThumbnail from "../../../assets/images/driver1.png";
import pdfThumbnail from "../../../assets/images/PDf.png";
// import PDFViewer from "../../../Components/PdfViewer";
import DashboardModal from "../../../Components/DashboardModal";
import { useState } from "react";
import RoundedButton from "../../../Components/RoundedButton";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useBuyerAgencyLoginStatusMutation } from "../../../features/buyeragency/buyerAgencySlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const extractFileName = (path) => {
  const fileName = path.split("/").pop();
  return fileName;
};

function shortenFileName(fileName, maxLength = 20) {
  if (fileName.length > maxLength) {
    return fileName.slice(0, maxLength) + "...";
  }
  return fileName;
}

export default function BuyerRequestCard({ item, doc }) {
  const buyer = item?.buyer;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const [updateStatus] = useBuyerAgencyLoginStatusMutation();
  const [loadingStates, setLoadingStates] = useState({
    approved: false,
    cancel: false,
  });

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const buyerImage = getImageUrl(buyer?.image, defaultThumbnail);

  const docImages = doc[0]?.image || [];
  const docPdf = doc[0]?.document || "";
  const docFileName = shortenFileName(extractFileName(docPdf), 20);

  const handleLoginStatus = async (status) => {
    try {
      // Set loading for the clicked button only
      setLoadingStates((prev) => ({
        ...prev,
        [status]: true,
      }));

      const body = {
        userId: item?._id,
        status,
        toUpdate: "buyer",
      };
      const res = await updateStatus(body).unwrap();

      if (res?.success) {
        toast.success(
          status === "cancel" ? "Request rejected." : "Request Approved"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      // Reset loading for the clicked button only
      setLoadingStates((prev) => ({
        ...prev,
        [status]: false,
      }));
    }
  };

  return (
    <div className="bg-white py-2 rounded-md shadow-md border-gray-200 border-2 flex flex-col justify-between">
      <div className="flex items-center justify-center flex-col">
        <img
          src={buyerImage}
          alt="profile_picture"
          onError={(e) => (e.target.src = defaultThumbnail)}
          className="w-16 h-16 object-contain rounded-full"
        />
        <h3 className="text-black text-xl">
          {item?.buyer?.firstName + " " + item?.buyer?.lastName}
        </h3>
        <p className="text-black/90 text-sm">{item.role}</p>
      </div>
      <div className="driver-request__info">
        <h1 className="text-sm md:text-xl text-black pl-4 mb-3">Documents</h1>

        {/* documents */}
        <div className="flex items-center justify-center text-xs gap-8">
          {docImages &&
            docImages.length > 0 &&
            docImages?.map((img, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 relative group"
              >
                <img
                  src={import.meta.env.VITE_API_IMAGE_BASE_URL + img}
                  alt="document_image"
                  className="w-16 h-16 object-contain rounded-full border border-primary"
                />
                <p>{shortenFileName(extractFileName(img))}</p>
                <div
                  onClick={() =>
                    showModal({
                      imgUrl: import.meta.env.VITE_API_IMAGE_BASE_URL + img,
                    })
                  }
                  className="absolute top-0 bg-gray-600/50 w-16 h-16 group-hover:flex justify-center items-center rounded-full hidden hover:cursor-pointer"
                >
                  <AiOutlineFullscreen size={20} color="white" />
                </div>
              </div>
            ))}

          {docPdf && (
            <div className="flex flex-col items-center justify-center gap-2">
              <a
                href={import.meta.env.VITE_API_IMAGE_BASE_URL + docPdf}
                target="_blank"
              >
                <img
                  src={pdfThumbnail}
                  alt="document_image"
                  className="w-16 h-16 object-contain"
                />
              </a>
              <p>{docFileName}</p>
              {/* <PDFViewer
                pdfUrl={import.meta.env.VITE_API_IMAGE_BASE_URL + docPdf}
              /> */}
            </div>
          )}

          {docImages?.length < 1 && (!docPdf || docPdf?.length < 1)
            ? "No documents found"
            : ""}
        </div>
      </div>

      {/* buttons */}
      <div className="flex items-center justify-center gap-1">
        <div className="p-4 text-center flex items-center justify-center">
          <button
            onClick={() => handleLoginStatus("approved")}
            className="w-fit bg-red-700 text-white px-10 py-2 flex items-center justify-center gap-3 text-sm outline-none rounded-lg"
            disabled={loadingStates.approved}
          >
            <span className="text-white font-light">
              {loadingStates.approved ? (
                <LoadingSpinner size={4} color="stroke-white" />
              ) : (
                "Approved"
              )}
            </span>
          </button>
        </div>
        <div className="p-4 text-center flex items-center justify-center">
          <button
            onClick={() => handleLoginStatus("cancel")}
            className="w-fit bg-transparent text-black border border-red-700 px-10 py-[7px] flex items-center justify-center gap-3 text-sm outline-none rounded-lg"
            disabled={loadingStates.cancel}
          >
            <span className="text-black font-light">
              {loadingStates.cancel ? (
                <LoadingSpinner size={4} color="stroke-primary" />
              ) : (
                "Cancel"
              )}
            </span>
          </button>
        </div>
      </div>
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        {modalData.imgUrl && (
          <>
            <p>{extractFileName(modalData?.imgUrl)}</p>
            <div className="flex justify-center mt-8 rounded border border-primary">
              <img
                src={modalData.imgUrl}
                alt="document_image"
                className=" object-cover border border-primary"
              />
            </div>
          </>
        )}
        <div className="flex justify-center mt-4">
          <RoundedButton
            onClickHandler={() => setIsModalOpen(false)}
            className="w-fit px-24"
          >
            Close
          </RoundedButton>
        </div>
      </DashboardModal>
    </div>
  );
}
