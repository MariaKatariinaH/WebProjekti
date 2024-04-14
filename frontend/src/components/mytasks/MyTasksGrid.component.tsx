import "./mytasks-grid.scss";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { IMyTask } from "../../types/global.typing";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const columns: GridColDef[] = [
  {
    field: "id",
    headerClassName: "super-app-theme--header",
    headerName: "ID",
    width: 50,
  },
  {
    field: "name",
    headerClassName: "super-app-theme--header",
    headerName: "Name",
    width: 100,
  },
  {
    field: "content",
    headerClassName: "super-app-theme--header",
    headerName: "Content",
    width: 300,
  },
  {
    field: "startDate",
    headerClassName: "super-app-theme--header",
    headerName: "Start Date",
    width: 100,
    renderCell: (params) => moment(params.row.startDate).format("DD-MM-YYYY"),
  },
  {
    field: "endDate",
    headerClassName: "super-app-theme--header",
    headerName: "End Date",
    width: 100,
    renderCell: (params) => moment(params.row.endDate).format("DD-MM-YYYY"),
  },
  {
    field: "status",
    headerClassName: "super-app-theme--header",
    headerName: "Status",
    width: 100,
    cellClassName: (params) => `status-${params.row.statusTheme.toLowerCase()}`,
  },
  {
    field: "tag",
    headerClassName: "super-app-theme--header",
    headerName: "#tag",
    width: 100,
    cellClassName: (params) => `tag-${params.row.tagTheme.toLowerCase()}`,
  },
  {
    field: "activityName",
    headerClassName: "super-app-theme--header",
    headerName: "Activity",
    width: 100,
  },
  {
    field: "actions",
    headerClassName: "super-app-theme--header",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton
          color="primary"
          onClick={() => params.row.handleUpdate(params.row.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => params.row.handleDelete(params.row.id)}
        >
          <Delete />
        </IconButton>
      </div>
    ),
  },
];

interface IMyTasksGridProps {
  data: IMyTask[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyTasksGrid: React.FC<IMyTasksGridProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleUpdate = (id: string) => {
    onEdit(id);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 450,
        "& .MuiDataGrid-sortIcon": {
          opacity: "inherit !important",
        },
      }}
      className="mytasks-grid"
    >
      <DataGrid 
        rows={data.map((row) => ({
          ...row,
          handleUpdate,
          handleDelete,
        }))}
        columns={columns}
        getRowId={(row) => row.id}
        rowHeight={50}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default MyTasksGrid;
