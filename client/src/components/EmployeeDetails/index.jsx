import React from 'react';
import { Grid } from '@mui/material';
import FilePreview from '../FilePreview';

function EmployeeDetails({ user }) {
  return (
    <Grid container spacing={1} sx={{ p: 5 }}>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Name</span>
            <span className="text-lg text-center">
              {user?.name?.first} {user?.name?.last}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Email</span>
            <span className="text-lg text-center">{user?.email}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Contact No</span>
            <span className="text-lg text-center">{user?.phone}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Birth Date</span>
            <span className="text-lg text-center">{user?.birthDate}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Designation</span>
            <span className="text-lg text-center">
              {user?.designation?.name}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Department</span>
            <span className="text-lg text-center">
              {user?.department?.name}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Work Type</span>
            <span className="text-lg text-center">{user?.workType}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Bank Pass Copy</span>
            <FilePreview fileToView={user?.bankPassPath} />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">ID Copy</span>
            <FilePreview fileToView={user?.idCardPath} />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <div className="bg-white p-2">
          <div className="flex flex-col">
            <span className="text-[#707070]">Resume Copy</span>
            <FilePreview fileToView={user?.resumePath} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default EmployeeDetails;
