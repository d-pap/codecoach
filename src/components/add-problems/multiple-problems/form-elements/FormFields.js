import React, { Suspense, lazy } from 'react'
import CustomLabel from '../custom-elements/CustomLabel'

// Dynamically import MUI components to optimize bundle size
const Stack = lazy(() => import('@mui/material/Stack'))
const TextField = lazy(() => import('@mui/material/TextField'))
const MenuItem = lazy(() => import('@mui/material/MenuItem'))
const Select = lazy(() => import('@mui/material/Select'))
const FormControl = lazy(() => import('@mui/material/FormControl'))
const InputLabel = lazy(() => import('@mui/material/InputLabel'))
const Grid = lazy(() => import('@mui/material/Grid'))

/**
 * FormFields Component
 * Renders form fields for contest details including regex patterns and region selection.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.formData - Current state of the form data
 * @param {Function} props.handleChange - Function to handle input changes
 * @param {Object} props.subregions - Object containing regions and their subregions
 */
const FormFields = ({ formData, handleChange, subregions }) => (
  // Suspense wraps dynamically imported components to handle loading states
  <Suspense fallback={<div>Loading Form Fields...</div>}>
    <Grid container spacing={2} mt={2}>
      {/* Left Column: Regex Fields */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={2}>
          {/* Keyword Regex Input */}
          <TextField
            required
            name="keywordRegex"
            value={formData.keywordRegex}
            onChange={handleChange}
            label="Keyword for Splitting Questions"
            variant="outlined"
          />
          
          {/* Description Start Regex Input */}
          <TextField
            name="descriptionStartRegex"
            value={formData.descriptionStartRegex}
            onChange={handleChange}
            label="Regex for Description Start"
            variant="outlined"
          />
          
          {/* Description End Regex Input */}
          <TextField
            required
            name="descriptionEndRegex"
            value={formData.descriptionEndRegex}
            onChange={handleChange}
            label="Regex for Description End"
            variant="outlined"
          />
        </Stack>
      </Grid>

      {/* Right Column: Answer Keyword Regex */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={2}>
          {/* Answer Keyword Regex Input */}
          <TextField
            name="answerKeywordRegex"
            value={formData.answerKeywordRegex}
            onChange={handleChange}
            label="Answer Keyword Regex"
            variant="outlined"
          />
        </Stack>
      </Grid>

      {/* Full-Width Row: Region, Subregion, and Year */}
      <Grid item xs={12}>
        <Stack spacing={2}>
          {/* Section Label */}
          <CustomLabel>Region and Year:</CustomLabel>
          
          {/* Contest Region Selection */}
          <FormControl fullWidth required>
            <InputLabel id="region-label">Contest Region *</InputLabel>
            <Select
              labelId="region-label"
              name="contestRegion"
              label="Contest Region"
              value={formData.contestRegion}
              onChange={handleChange}
            >
              {Object.keys(subregions).map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Contest Sub Region Selection */}
          <FormControl fullWidth required>
            <InputLabel id="sub-region-label">Contest Sub Region *</InputLabel>
            <Select
              labelId="sub-region-label"
              name="contestSubRegion"
              label="Contest Sub Region"
              value={formData.contestSubRegion}
              onChange={handleChange}
              disabled={!formData.contestRegion}
            >
              {subregions[formData.contestRegion]?.map((subregion) => (
                <MenuItem key={subregion} value={subregion}>
                  {subregion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Contest Year Input */}
          <TextField
            required
            type="number"
            name="contestYear"
            value={formData.contestYear}
            onChange={handleChange}
            label="Please Input a Contest Year"
            variant="outlined"
            inputProps={{ min: 2000, max: 2030 }}
          />
        </Stack>
      </Grid>
    </Grid>
  </Suspense>
)

export default FormFields
