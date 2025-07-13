import React, { useState }   from 'react'
import { Box, Popover } from '@mui/material'

const AdsPopover = () => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const anchorEl = null;  // TODO: add anchorEl
  return (
    <>
    <Popover
    open={open}
    onClose={handleClose}
    anchorEl={anchorEl}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
    >
        <Box></Box>
    </Popover>
    </>
  )
}

export default AdsPopover