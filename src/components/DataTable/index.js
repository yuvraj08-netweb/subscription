import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

export default function DataTable({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "planName", headerName: "Plan Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      width: 90,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 160,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      planName: data?.activePlan?.planName,
      amount: data?.activePlan?.amount,
      startDate: dayjs(data?.activePlan?.startDate).format("DD MMM, YYYY"),
      endDate: dayjs(data?.activePlan?.endDate).format("DD MMM, YYYY"),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
