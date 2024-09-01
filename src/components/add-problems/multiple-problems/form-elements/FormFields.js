import React from 'react'
import {
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material'
import CustomLabel from '../custom-elements/CustomLabel'

const FormFields = ({ formData, handleChange, subregions }) => (
  <Grid container spacing={2} mt={2}>
    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>
        <TextField
          required
          name="keywordRegex"
          value={formData.keywordRegex}
          onChange={handleChange}
          label="Keyword for Splitting Questions"
          variant="outlined"
        />
        <TextField
          name="descriptionStartRegex"
          value={formData.descriptionStartRegex}
          onChange={handleChange}
          label="Regex for Description Start"
          variant="outlined"
        />
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

    <Grid item xs={12} sm={6}>
      <Stack spacing={2}>
        <FormControl fullWidth required>
          <InputLabel id="answer-parse-method-label">
            Answer Parsing Method
          </InputLabel>
          <Select
            labelId="answer-parse-method-label"
            name="answerParsingMethod"
            value={formData.answerParsingMethod}
            onChange={handleChange}
            label="Answer Parsing Method"
          >
            <MenuItem value="regex">Regex Parsing</MenuItem>
            <MenuItem value="page">Page by Page Parsing</MenuItem>
          </Select>
        </FormControl>

        {formData.answerParsingMethod === 'regex' && (
          <TextField
            name="answerKeywordRegex"
            value={formData.answerKeywordRegex}
            onChange={handleChange}
            label="Answer Keyword Regex"
            variant="outlined"
          />
        )}
      </Stack>
    </Grid>

    <Grid item xs={12}>
      <Stack spacing={2}>
        <CustomLabel>Region and Year:</CustomLabel>
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
)

export default FormFields
