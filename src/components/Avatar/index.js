import { stringToColor } from "@/utils";
import { Avatar } from "@mui/material";

export default function UserAvatar({ name }) {
  console.log(name,"name")
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#f3f3f3",
        width: "80px",
        height: "80px",
      },
      children: `${name[0]}`,
    };
  }

  return (
    <>
      <Avatar {...stringAvatar(name)} />
    </>
  );
}
