import Swal from "sweetalert2";
import { getImageUrl } from "../../../utils/getImageUrl";
import defaultThumbnail from "../../../assets/images/driver1.png";
import pdfThumbnail from "../../../assets/images/PDf.png";
// import PDFViewer from "../../../Components/PdfViewer";
import DashboardModal from "../../../Components/DashboardModal";
import { useState } from "react";
import RoundedButton from "../../../Components/RoundedButton";
import { AiOutlineFullscreen } from "react-icons/ai";

export default function AgencyRequestCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const agency = item?.userId?.agency;

  const agencyImage = getImageUrl(agency?.image, defaultThumbnail);

  const docImages = item.image;
  const docPdf = item.document;

  const handleDeleteConfirmation = () => {
    Swal.fire({
      text: "Are you sure you want to cancel the request?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // dispatch(logout());
        // localStorage.removeItem("token");
        // localStorage.removeItem("user-update");
        // navigate("/auth");
      }
    });
  };
  return (
    <div className="bg-white py-2 rounded-md shadow-md border-gray-200 border-2">
      <div className="flex items-center justify-center flex-col">
        <img
          src={agencyImage}
          alt="profile_picture"
          onError={(e) => (e.target.src = defaultThumbnail)}
          className="w-16 h-16 object-contain rounded-full"
        />
        <h3 className="text-black">{item.name}</h3>
        <p className="text-black/90 text-sm">{item.designation}</p>
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
                <p>{`doc-${index + 1}`}</p>
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
              <p>{`doc-${docImages.length + 1}`}</p>
              {/* <PDFViewer
                pdfUrl={import.meta.env.VITE_API_IMAGE_BASE_URL + docPdf}
              /> */}
            </div>
          )}

          {!docImages && !docPdf ? "No documents found" : ""}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <div className="p-4  text-center flex items-center justify-center">
          <button className="w-fit bg-red-700 text-white px-10 py-2 flex items-center justify-center gap-3 text-sm outline-none rounded-lg">
            <span className="text-white font-light">Approved</span>
          </button>
        </div>
        <div className="p-4  text-center flex items-center justify-center">
          <button
            onClick={handleDeleteConfirmation}
            className="w-fit bg-transparent text-black border border-red-700 px-10 py-[7px] flex items-center justify-center gap-3 text-sm outline-none rounded-lg"
          >
            <span className="text-black font-light">Cancel</span>
          </button>
        </div>
      </div>
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        {modalData.imgUrl && (
          <div className="flex justify-center mt-8 rounded border border-primary">
            <img
              src={modalData.imgUrl}
              alt="document_image"
              className=" object-cover border border-primary"
            />
          </div>
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
