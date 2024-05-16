"use client";
import CustomDrawer from "@/src/ui/molecules/CustomDrawer";
import { Header } from "../../ui/organism/header";
import Toast from "@/src/ui/atom/Toast";
import { useEffect, useState } from "react";
import FileUpload from "@/src/ui/atom/FileUpload";
import FormContent from "@/src/ui/atom/FormContent";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isBottomRight, setIsBottomRight] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 10);
      } else {
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [progress]);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onloadend;
    reader.readAsDataURL(uploadedFile);
  };

  const handleButtonClick = () => {
    setShowToast(true);
  };
  const toastHandler = (flag) => {
    console.log("flag", flag)
    setShowToast(flag);
    return true
  };

  const handleRight = (flag) => {
    setIsRight(flag);
  };
  const handleBottomRight = (flag) => {
    setIsBottomRight(flag);
  };
  const handleBottom = (flag) => {
    setIsBottom(flag);
  };

  return (
    <main style={{ height: 2000 }}>
      <Header></Header>
      <h1>This is Home Page</h1>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setIsRight(true)}
          className="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-32 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          {isRight ? <span>Close Drawer</span> : <span>Open Drawer</span>}
        </button>
        {/* <Toast
          variant="info"
          header="OTP sent to mobile & email ID"
          isCloseButton={true}
          isToast={showToast}
          toastHandler={toastHandler}
        /> */}
      </div>
      <div className="w-1/4">
        <CustomDrawer
          position="right"
          isDrawerOpen={isRight}
          handleDrawer={handleRight}
        >
          {isRight && (
            <div>
              <button
                className="w-24 h-8 bg-red-400"
                onClick={handleButtonClick}
              >
                SHOW TOAST
              </button>
              {showToast && (
                <div className={`relative w-96 h-4`}>
                  <FileUpload onFileUpload={handleFileUpload} />
                  {/* {file && (
                    <Toast
                      variant="info"
                      header="File Uploading..."
                      isToast={showToast}
                      toastHandler={toastHandler}
                      isLoader={true}
                      isDrawer={true}
                      progress={progress}
                    />
                  )} */}
                  <Toast
              variant="warning"
              header="File Uploading..."
              isToast={showToast}
              isDrawer={true}
              toastHandler={toastHandler}
              isCloseButton={true}
              isLoader={true}
            />
                </div>
              )}
            </div>
          )}
          <FormContent />
          <div>
            <button
              className="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              onClick={() => setIsBottomRight(true)}
            >
              Bottom Right Drawer
            </button>
          </div>
        </CustomDrawer>
      </div>
      <CustomDrawer
            position="bottomRight"
            isDrawerOpen={isBottomRight}
            handleDrawer={handleBottomRight}
          >
            <div>
              <button
                className="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={() => setIsBottom(true)}
              >
                Bottom Drawer
              </button>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur totam iste numquam veritatis quasi dicta optio?
              Provident accusantium, eos repellendus animi est cupiditate.
              Officiis sunt vero, consectetur dolorum illum doloremque. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, et
              temporibus? Rerum dolore provident dignissimos necessitatibus
              aperiam, optio ea, possimus perferendis, et debitis ullam
              eligendi. Dicta nihil fuga aliquam dolorem! Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Amet quis distinctio facilis
              harum expedita, incidunt laborum accusantium exercitationem cum
              culpa at voluptas, voluptatibus dignissimos sapiente odio facere
              enim unde aspernatur.
            </div>
          </CustomDrawer>
      <CustomDrawer
        position="bottom"
        isDrawerOpen={isBottom}
        handleDrawer={handleBottom}
      >
        ADNAN Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
        perferendis harum nesciunt voluptatem dicta omnis! Corporis, quos?
        Accusamus distinctio itaque tenetur ea consequatur minima consectetur
        illo, eveniet hic molestias fuga.
      </CustomDrawer>
    </main>
  );
}

