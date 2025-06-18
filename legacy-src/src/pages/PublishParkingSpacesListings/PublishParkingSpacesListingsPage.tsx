import { useEffect, useState } from 'react'
import { Box, Button, MenuItem, Select, Stack, Typography } from '@mui/material'
import { type GridRowId, type GridColDef } from '@mui/x-data-grid'
import { Listing } from 'onecore-types'

import { DataGridTable } from '../../components'
import {
  ListingWithOffer,
  useParkingSpaceListings,
} from '../ParkingSpaces/hooks/useParkingSpaceListings'

const getColumns = (): Array<GridColDef<ListingWithOffer>> => {
  const numberFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  })

  const sharedColumnProps = {
    editable: false,
    flex: 1,
  }

  return [
    {
      field: 'address',
      headerName: 'Bilplats',
      ...sharedColumnProps,
      flex: 1.25,
      renderCell: ({ row }) => (
        <span>
          {row.address}
          {row.rentalObjectCode}
        </span>
      ),
    },
    {
      field: 'blockCaption',
      headerName: 'Område',
      ...sharedColumnProps,
    },
    {
      field: 'districtCaption',
      headerName: 'Distrikt',
      ...sharedColumnProps,
    },
    {
      field: 'objectTypeCaption',
      headerName: 'Bilplatstyp',
      ...sharedColumnProps,
    },
    {
      field: 'monthlyRent',
      headerName: 'Hyra',
      ...sharedColumnProps,
      valueFormatter: ({ value }) => `${numberFormatter.format(value)}/mån`,
    },
    {
      field: 'numTimesPublishedInInternalQueue',
      headerName: 'Antal publiceringar intern kö',
      ...sharedColumnProps,
    },
  ]
}

const getActionColumns = (): Array<GridColDef<ListingWithOffer>> => {
  return [
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 250,
      headerName: 'Publicera i kötyp',
      headerAlign: 'left',
      renderCell: () => (
        <Select defaultValue="internal" fullWidth>
          <MenuItem value="internal">Intern</MenuItem>
          <MenuItem value="external">Extern</MenuItem>
          <MenuItem value="no-points">Poängfri</MenuItem>
        </Select>
      ),
    },
  ]
}

const Listings = ({
  columns,
  rows = [],
  loading,
  selectedIds,
  onRowSelectionModelChange,
}: {
  columns: Array<GridColDef>
  rows?: Array<Listing>
  loading: boolean
  selectedIds: Array<GridRowId>
  onRowSelectionModelChange: (model: Array<GridRowId>) => void
}) => (
  <DataGridTable
    slots={{
      noRowsOverlay: () => (
        <Stack paddingTop="1rem" alignItems="center" justifyContent="center">
          <Typography fontSize="14px">
            Det finns inga annonser att visa.
          </Typography>
        </Stack>
      ),
    }}
    columns={columns}
    rows={rows}
    loading={loading}
    rowHeight={72}
    checkboxSelection
    autoHeight
    hideFooterPagination
    rowSelectionModel={selectedIds}
    onRowSelectionModelChange={onRowSelectionModelChange}
  />
)

const handlePublishParkingSpaces = (ids: Array<GridRowId>) => {
  console.log('Publishing parking spaces with IDs:', ids)
}

const PublishParkingSpacesPage: React.FC = () => {
  const { data: listings, isLoading } = useParkingSpaceListings('published')
  const [selectedIds, setSelectedIds] = useState<Array<GridRowId>>([])

  useEffect(() => {
    if (listings) {
      setSelectedIds(listings.map(({ id }) => id))
    }
  }, [listings])

  return (
    <Box>
      <Typography variant="h1" paddingBottom={2}>
        Publicera bilplatser
      </Typography>

      <Typography variant="body1" paddingBottom={2}>
        Nedan listas alla bilplatser som behöver ompubliceras från Xpand och som
        ej är spärrade.
      </Typography>

      <Listings
        key="needs-republish"
        rows={listings}
        columns={[...getColumns(), ...getActionColumns()]}
        loading={isLoading}
        selectedIds={selectedIds}
        onRowSelectionModelChange={setSelectedIds}
      />

      <Box display="flex" justifyContent="space-between">
        <Button variant="dark-outlined" onClick={() => window.history.back()}>
          Avbryt
        </Button>

        <Button
          variant="contained"
          onClick={() => handlePublishParkingSpaces(selectedIds)}
        >
          Publicera bilplatser
        </Button>
      </Box>
    </Box>
  )
}

export default PublishParkingSpacesPage
