import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { styled, alpha } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import { fetchProblems } from '../api'
import { getSubregions } from '../components/problems/subregions'
import ProblemCardLayout from '../components/problems/ProblemCardLayout'
import PageLayout from '../components/PageLayout'
import ProblemsList from '../components/ProblemsList'
import FilterToolbar from '../components/FilterToolbar'

function CourseContent() {
  //! dummy data for problems in a course
  const problems = [
    {
      _id: '1',
      title: 'Problem 1',
      description: 'Problem 1 Description',
      difficulty: 'Easy',
      topics: ['Array', 'String'],
      contestRegion: 'Africa',
      contestYear: 2024,
    },
    {
      _id: '2',
      title: 'Problem 2',
      description: 'Problem 2 Description',
      difficulty: 'Medium',
      topics: ['Array', 'String'],
      contestRegion: 'Africa',
      contestYear: 2024,
    },
  ]

  //TODO: need the following for pagination vvvvvv --------------------------------
  const problemsPerPage = 10
  //TODO: get `totalProblems` from the API for `count={Math.ceil(totalProblems / problemsPerPage)}`
  const totalProblems = 30 //! get from API, react query fetch
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }
  const paginationComponent = (
    <Pagination
      count={Math.ceil(totalProblems / problemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      size="small"
    />
  )
  //TODO: need the above for pagination ^^^^^ --------------------------------

  //TODO: need the following for filters vvvvvv --------------------------------
  const [region, setRegion] = useState('all')
  const [subregion, setSubregion] = useState('all')
  const [year, setYear] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America']
  const subregions = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
  ]
  const years = [2024, 2023, 2022, 2021, 2020]

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const regionOptions = regions.map((reg) => ({
    value: reg,
    label: reg,
  }))

  const filterConfig = [
    {
      id: 'region',
      value: region,
      onChange: (e) => setRegion(e.target.value),
      allLabel: 'All Regions',
      options: regions.map((reg) => ({
        value: reg,
        label: reg,
      })),
    },
    {
      id: 'subregion',
      value: subregion,
      onChange: (e) => setSubregion(e.target.value),
      allLabel: 'All Subregions',
      options: subregions.map((sub) => ({
        value: sub,
        label: sub,
      })),
    },
    {
      id: 'year',
      value: year,
      onChange: (e) => setYear(e.target.value),
      allLabel: 'All Years',
      options: years.map((y) => ({
        value: y,
        label: y.toString(),
      })),
    },
  ]
  //TODO: need the above for filters ^^^^^ --------------------------------

  return (
    <PageLayout title="Course Title" description="Course Description">
      <ProblemsList
        filters={true}
        filterToolbar={
          <FilterToolbar
            filters={filterConfig}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        }
        pagination={true}
        topPagination={paginationComponent}
        bottomPagination={paginationComponent}
      >
        {problems.map((problem) => (
          <ProblemCardLayout key={problem._id} problem={problem} />
        ))}
      </ProblemsList>
    </PageLayout>
  )
}

export default CourseContent
