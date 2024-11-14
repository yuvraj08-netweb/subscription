import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
    return (

        <Backdrop
            // sx={(theme) => ({ color: "#000", zIndex: theme.zIndex.drawer + 1 })}
            sx={{color:"#eee",}}
            open="true"
        >
            <CircularProgress color="#000" />
        </Backdrop>
    )
}