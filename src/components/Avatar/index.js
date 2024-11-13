import { stringToColor } from "@/utils";
import { Avatar } from "@mui/material";

export default function UserAvatar({ name }) {
  console.log(name,"name")
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: "80px",
        height: "80px",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      <Avatar {...stringAvatar(name)} />
    </>
  );
}
