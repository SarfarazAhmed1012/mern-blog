import React, { useEffect, useRef, useState } from "react";
import { TextInput, Button, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const filePickerRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [fileUploadingProgress, setFileUploadingProgress] = useState(null);
  const [fileUploadingError, setFileUploadingError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setFileUploadingError("");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    // this snapshot is ran every bytes of uploading the file
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setFileUploadingError(
          "Could not upload image, file must be less than 2MB"
        );
        setFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className=" my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />
        <div
          className="relative w-32 h-32 self-center shadow-md rounded-full overflow-hidden cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {fileUploadingProgress && (
            <CircularProgressbar
              value={fileUploadingProgress || 0}
              text={`${fileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  color: `rgba(62, 152, 199, ${fileUploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`${
              fileUploadingProgress &&
              fileUploadingProgress < 100 &&
              " opacity-65"
            } rounded-full w-full h-full object-cover border-4 border-[rgb(211,211,211)]`}
          />
        </div>
        {fileUploadingError && (
          <Alert color="failure">{fileUploadingError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="text" id="username" placeholder="username" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
        <span className=" cursor-pointer">Delete account</span>
        <span className=" cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;
