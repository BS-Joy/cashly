import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { FaAngleLeft } from "react-icons/fa6";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <button onClick={() => navigate(-1)}>
          <FaAngleLeft className="" />
        </button>
        <h1 className="text-[26px] font-semibold text-grey-800">
          Privacy & Policy{" "}
        </h1>
      </div>
      <div className="rounded-lg py-4 border-[#f8f8f8] bg-[#f1f1f1] border-2 shadow-lg mt-8 ">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Privacy & Policy
          </h3>
          <div className="w-full px-16">
            <div className="space-y-5 text-black text-sm">
              <h1>
                Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
                orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
                facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
                amet turpis habitant. Imperdiet tincidunt nisl consectetur
                hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
                pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
                morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
                sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi
                posuere faucibus. Cras risus ultrices duis pharetra sit
                porttitor elementum sagittis elementum. Ut vitae blandit
                pulvinar fermentum in id sed. At pellentesque non semper eget
                egestas vulputate id volutpat quis. Dolor etiam sodales at
                elementum mattis nibh quam placerat ut. Suspendisse est
                adipiscing proin et. Leo nisi bibendum donec ac non eget euismod
                suscipit. At ultricies nullam ipsum tellus. Non dictum orci at
                tortor convallis tortor suspendisse. Ac duis senectus arcu
                nullam in suspe ndisse vitae. Tellus interdum enim lorem vel
                morbi lectus.
              </h1>
              <h1>
                Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
                orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
                facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
                amet turpis habitant. Imperdiet tincidunt nisl consectetur
                hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
                pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
                morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
                sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi
                posuere faucibus. Cras risus ultrices duis pharetra sit
                porttitor elementum sagittis elementum. Ut vitae blandit
                pulvinar fermentum in id sed. At pellentesque non semper eget
                egestas vulputate id volutpat quis. Dolor etiam sodales at
                elementum mattis nibh quam placerat ut. Suspendisse est
                adipiscing proin et. Leo nisi bibendum donec ac non eget euismod
                suscipit. At ultricies nullam ipsum tellus. Non dictum orci at
                tortor convallis tortor suspendisse. Ac duis senectus arcu
                nullam in suspendisse vitae. Tellus interdum enim lorem vel
                morbi lectus.
              </h1>
              <h1>
                Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
                orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
                facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
                amet turpis habitant. Imperdiet tincidunt nisl consectetur
                hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
                pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
                morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
                sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi
                posuere faucibus. Cras risus ultrices duis pharetra sit
                porttitor elementum sagittis elementum. Ut vitae blandit
                pulvinar fermentum in id sed. At pellentesque non semper eget
                egestas vulputate id volutpat quis. Dolor etiam sodales at
                elementum mattis nibh quam placerat ut. Suspendisse est
                adipiscing proin et. Leo nisi bibendum donec ac non eget euismod
                suscipit. At ultricies nullam ipsum tellus. Non dictum orci at
                tortor convallis tortor suspendisse. Ac duis senectus arcu
                nullam in suspe ndisse vitae. Tellus interdum enim lorem vel
                morbi lectus.
              </h1>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={(e) => navigate(`edit`)}
                // size="large"
                // type="primary"
                className="px-8 py-4 bg-red-700 text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
