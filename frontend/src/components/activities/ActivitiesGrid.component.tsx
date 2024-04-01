import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { IActivity } from "../../types/global.typing";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "activityType", headerName: "Type of Activity", width: 150 },
  { field: "status", headerName: "Status of Activity", width: 150 },
  { field: "statusTheme", headerName: "Theme of Status", width: 150 },
  { field: "tag", headerName: "Tag", width: 150 },
  { field: "tagTheme", headerName: "Theme of Tag", width: 150 },
  {
    field: "createdAt",
    headerName: "Creation Time",
    width: 150,
    renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
  },
  {
    field: "updatedAt",
    headerName: "Time of Updating",
    width: 150,
    renderCell: (params) => moment(params.row.updatedAt).format("DD-MM-YYYY"),
  },
];

interface IActivitiesGridProps {
  data: IActivity[];
}

const ActivitiesGrid = ({ data }: IActivitiesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="activities-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default ActivitiesGrid;
