import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Quill from "quill";

// Import 'size' style attributor
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
      [{ color: [] }], // Text color dropdown
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ align: [] }],
      ["image", "link"],
      [{ list: "bullet" }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format("align", value);
      },
    },
  },
};

const formats = [
  "size", // Custom font sizes
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];
const EditTrust = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  console.log(content);

  useEffect(() => {
    const quillContainer = document.querySelector(".ql-toolbar"); // Get the toolbar
    if (!quillContainer) return;

    const updateColorIndicator = (color) => {
      const colorPicker = document.querySelector(
        ".ql-picker.ql-color .ql-picker-label"
      );
      if (colorPicker) {
        colorPicker.style.setProperty("--selected-color", color); // Store selected color
        colorPicker.style.color = color; // Change color of text
      }
    };

    quillContainer.addEventListener("click", (event) => {
      const target = event.target.closest(
        ".ql-color .ql-picker-options [data-value]"
      );
      if (target) {
        const selectedColor = target.getAttribute("data-value");
        updateColorIndicator(selectedColor);
      }
    });

    return () => {
      quillContainer.removeEventListener("click", () => {}); // Cleanup event listener
    };
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <button onClick={() => navigate(-1)}>
          <FaAngleLeft className="" />
        </button>
        <h1 className="text-[26px] font-semibold text-grey-800">
          Trust & Safety Edit{" "}
        </h1>
      </div>
      <div className="rounded-lg py-4 border-white border-2 shadow-lg mt-8 bg-[#F1F1F1]">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 mt-6 pb-3 pl-16">
            Trust & Safety Edit
          </h3>
          <div className="w-full px-16">
            <div className="h-full rounded-md">
              <div className="ql-toolbar-container border border-[#DD3663] rounded-lg max-h-[400px] overflow-y-auto">
                <ReactQuill
                  placeholder="Enter your updated trust & safety..."
                  theme="snow"
                  value={content}
                  onChange={(value) => setContent(value)}
                  modules={modules}
                  formats={formats}
                  className="custom-quill-editor h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-8 pr-16">
            <button
              // onClick={(e) => navigate(`edit`)}
              className="px-8 py-4 bg-red-700 text-white hover:bg-red-900 rounded-full font-semibold w-1/4"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTrust;
