import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClientQuery } from '../../app/features/clients/clientApiSlice';
import { Loader } from '../../components';

function Client() {
  const { id } = useParams()
  const { data: client, isLoading: isClientDataLoading } = useGetClientQuery(id)

  if (isClientDataLoading) return <Loader />
  return (
    <div>
      <p>Client: {client?.name.first} {client?.name.last}</p>
      <p>Contact: {client?.phone}</p>
      <p>Projects: {client?.projectHistory && client?.projectHistory.length === 0 ? 'No projects available' : client?.projectHistory}</p>
    </div>
  )
}

export default Client