import { Box, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import facebookIcon from '@/assets/landing_page/facebook.png'
import instagramIcon from '@/assets/landing_page/instagram.png'
import twitterIcon from '@/assets/landing_page/twitter.png'
import linkedinIcon from '@/assets/landing_page/linkedin.png'

const Footer = () => {
  return (
      <Box justifyItems='center' bgcolor='secondary.main' padding={10}>
        <Stack direction="row" spacing={2}>
                <Typography sx={{textDecoration: 'none'}} color='white' variant="h6" component={Link} href="/">Consultation</Typography>
                <Typography sx={{textDecoration: 'none'}} color='white' variant="h6" component={Link} href="/about">Health Plans</Typography>
                <Typography sx={{textDecoration: 'none'}} color='white' variant="h6" component={Link} href="/contact">Medicine</Typography>
                <Typography sx={{textDecoration: 'none'}} color='white' variant='h6' component={Link} href="/visitor">Diagnostics</Typography>
                <Typography sx={{textDecoration: 'none'}} color='white' variant="h6" component={Link} href="/login">NGOs</Typography>
        </Stack>
        <Stack direction="row" spacing={2} padding={3}>
                <Image width={40} height={30} src={facebookIcon} alt='Facebook icon'/>
                <Image width={40} height={30} src={instagramIcon} alt='Facebook icon' />
                <Image width={40} height={30} src={twitterIcon} alt='Facebook icon' />
                <Image width={40} height={30} src={linkedinIcon} alt='Facebook icon' />
                <Image width={40} height={30} src={facebookIcon} alt='Facebook icon' />
        </Stack>
        <div className='border-b-[1px] border-dashed w-full m-2'></div>
        <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between' 
        alignItems='center' 
        gap={2}
        sx={{ width: '100%' }}
      >
        <Typography component='p' color='white' variant='body2' sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
          &copy; 2024 HealthHub. All Rights Reserved.
        </Typography>

        <Typography 
          variant="h5" 
          component={Link} 
          href='/' 
          color='primary' 
          sx={{ textDecoration: 'none', fontWeight: 'bold', fontSize: { xs: '24px', sm: '42px' } }}
        >
          HealthHub
        </Typography>

        {/* Right Side: Privacy Policy & Terms */}
        <Typography 
          component="p" 
          color='white' 
          variant='body2' 
        >
          <Link href='/privacy' color='inherit' underline="hover">Privacy Policy</Link> |
          <Link href='/terms' color='inherit' underline="hover">Terms & Conditions</Link>
        </Typography>
      </Stack>  

    </Box>
  )
} 

export default Footer;