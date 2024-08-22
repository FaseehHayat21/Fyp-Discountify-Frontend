import { Box, Drawer, List } from '@mui/material'
import React from 'react'

const MobileSidebar = ({Icons, footerIcons,handleFunction,selected}) => {
  return (
      <Drawer anchor='left' variant='permanent' >

          <List sx={{ boxShadow: 'inset 0px 4px 16px rgba(0, 0, 0, 0.05)', backgroundColor: '#21497F', height: '100%', }}>
              
              <Box sx={{ paddingX: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                  {
                      Icons.map((icon) => (
                          <Box onClick={() => handleFunction(icon.title)} key={icon.title} sx={{
                              padding: '0.1em',
                              borderBottom: selected === icon.title ? '1px solid #fbae18' : 'none' ,
                              paddingY: '0.2em', display: 'flex', width: '100%', marginTop: '1em', justifyContent: 'flex-start', alignItems: 'center', '&:hover': {
                                  transform: 'scale(1.05)', cursor: 'pointer',
                              }
                          }} >
                              <Box>
                                  {icon.icon}
                              </Box>
                              
                          </Box>
                      ))
                  }
              </Box>



          </List>

          <Box sx={{ background: '#21497F', marginTop: 'auto' }}>
              <hr style={{
                  width: '80%',
                  border: 0,
                  height: '2px',
                  background: '#fff'
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', paddingX: '1em', paddingBottom: '1em', justifyContent: 'center', flexDirection: 'column' }} >
                  {
                      footerIcons.map((icon) => (
                          <Box onClick={() => handleFunction(icon.title)} key={icon.title} sx={{
                              paddingY: '0.2em', display: 'flex', width: '100%', marginTop: '2em', justifyContent: 'center', alignItems: 'center', '&:hover': {
                                  transform: 'scale(1.05)', cursor: 'pointer'
                              }
                          }} >
                              <Box>
                                  {icon.icon}
                              </Box>
                          </Box>
                      ))
                  }
              </Box>
          </Box>
      </Drawer>
  )
}

export default MobileSidebar