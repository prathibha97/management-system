import { InputLabel, MenuItem, Select, TextField, } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser } from '../../app/features/auth/authSelectors'
import { useGetClientsQuery } from '../../app/features/clients/clientApiSlice'
import { getClients } from '../../app/features/clients/clientSlice'
import { useGetDepartmentEmployeeListQuery, useGetDepartmentsQuery } from '../../app/features/departments/departmentApiSlice'
import { departmentEmployeeList, getDepartments } from '../../app/features/departments/departmentSlice'
import { useCreateProjectMutation } from '../../app/features/projects/projectApiSlice'
import { setCreateProject } from '../../app/features/projects/projectSlice'
import Loader from '../Loader'

function CreateProject() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('')
  const [category, setCategory] = useState('NFT')
  const [client, setClient] = useState('')
  const [deadline, setDeadline] = useState(moment().format('YYYY-MM-DD'))
  const [team, setTeam] = useState([])
  const [designLink, setDesignLink] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')
  const [projectScope, setProjectScope] = useState(null)
  const [nftBaseDesignCount, setNftBaseDesignCount] = useState(0)
  const [nftTradeCount, setNftTradeCount] = useState(0)
  const [nftCollectionSize, setnftCollectionSize] = useState(0)

  const userInfo = useSelector(selectCurrentUser);

  const { data: employees } = useGetDepartmentEmployeeListQuery(department)
  const { data: clients } = useGetClientsQuery()
  const { data: departments } = useGetDepartmentsQuery()

  const [createProject, { isLoading: isProjectCreateLoading }] = useCreateProjectMutation()

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUser || storedUser.empNo !== userInfo.empNo) {
        dispatch(getDepartments({ departments }))
        dispatch(getClients({ clients }))
        dispatch(departmentEmployeeList({ departmentId: department._id, employeeList: employees }))
      }
    }
  }, [userInfo, department])


  const handleCreateProject = async () => {
    try {
      const projectData = await createProject({
        title,
        category,
        department,
        client,
        deadline,
        team,
        designLink,
        specialNotes,
        projectScope,
        nftBaseDesignCount,
        nftTradeCount,
        nftCollectionSize
      }).unwrap()
      dispatch(setCreateProject({ project: projectData }))
      navigate('/projects')
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = () => {
    navigate('/projects')
  }

  if (isProjectCreateLoading) return <Loader />

  return (
    <div className='bg-[#EEF2F5] h-[90%] w-[95%] mt-6 rounded-xl m-auto overflow-y-auto'>
      <div className='flex flex-col mt-1 ml-[55px]'>
        <h1 className='text-2xl font-bold mt-4'>Create New Project</h1>
        <p className='text-[#707070] text-sm'>Here you can create a new project</p>
      </div>
      <div className='flex bg-white px-12 py-5 mt-5 justify-between items-center w-[90%] h-[90%] m-auto rounded-2xl overflow-y-auto'>
        <div className='flex flex-wrap justify-between gap-1'>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Project Title
            </InputLabel>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Department
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" onChange={(e) => setDepartment(e.target.value)} value={department}>
              {departments?.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>{item?.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Category
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" onChange={(e) => setCategory(e.target.value)} value={category}>
              <MenuItem value='NFT'>NFT</MenuItem>
              <MenuItem value='Web Development'>Web Development</MenuItem>
              <MenuItem value='Graphic Design'>Graphic Design</MenuItem>
              <MenuItem value='Social Media Marketing'>Social Media Marketing</MenuItem>
            </Select>
          </div>
          {category === 'NFT' && (
            <>
              <div className='flex flex-col w-[45%]'>
                <InputLabel
                  labelid="emp-no-lable">
                  NFT Base Design Count
                </InputLabel>
                <TextField
                  value={nftBaseDesignCount}
                  onChange={(e) => setNftBaseDesignCount(e.target.value)}
                />
              </div>
              <div className='flex flex-col w-[45%]'>
                <InputLabel
                  labelid="emp-no-lable">
                  NFT Trade Count
                </InputLabel>
                <TextField
                  value={nftTradeCount}
                  onChange={(e) => setNftTradeCount(e.target.value)}
                />
              </div>
              <div className='flex flex-col w-[45%]'>
                <InputLabel
                  labelid="emp-no-lable">
                  NFT Collection Size
                </InputLabel>
                <TextField
                  value={nftCollectionSize}
                  onChange={(e) => setnftCollectionSize(e.target.value)}
                />
              </div>
            </>
          )}
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Client
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" onChange={(e) => setClient(e.target.value)} value={client}>
              {clients?.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>{item?.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Deadline
            </InputLabel>
            <TextField
              type='date'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="gender-lable">
              Assignees
            </InputLabel>
            <Select labelid="gender-lable" id="gender-lable" multiple onChange={(e) => setTeam(e.target.value)} value={team}>
              {employees?.map((employee) => (
                <MenuItem key={employee?._id} value={employee?._id}>{employee?.name?.first} {employee?.name?.last}</MenuItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Design Link
            </InputLabel>
            <TextField
              value={designLink}
              onChange={(e) => setDesignLink(e.target.value)}
              placeholder='https://www.figma.com/'
            />
          </div>
          <div className='flex flex-col w-[45%]'>
            <InputLabel
              labelid="emp-no-lable">
              Project Scope
            </InputLabel>
            <TextField
              type='file'
              id='pdf-file-input'
              accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
              onChange={(e) => setProjectScope(e.target.files[0])}
            />
          </div>
          <div className='flex flex-col w-[100%]'>
            <InputLabel
              labelid="address-lable">
              Special Notes
            </InputLabel>
            <div className='flex flex-wrap justify-between w-[100%] gap-10'>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end py-5 gap-6 mr-[55px]'>
        <button type='button' className='bg-white text-[#707070] py-2 px-5 rounded' onClick={handleCancel}>Cancel</button>
        <button type='button' className='bg-[#1DB3AB] text-white py-2 px-5 rounded' onClick={handleCreateProject}>Create Project</button>
      </div>
    </div>
  )
}

export default CreateProject