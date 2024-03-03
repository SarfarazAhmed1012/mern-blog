import React from "react";
import { TextInput, Button } from "flowbite-react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
      <h1 className=" my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center shadow-md rounded-full overflow-hidden">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
          />
        </div>
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
