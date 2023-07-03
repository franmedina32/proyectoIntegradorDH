import { useEffect, useState } from 'react';
import logoNav from '../../../Img/logoNavAzul.png';
import compartir from '../../../Img/compartir.png';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../footer/footer.css';
import { Outlet } from 'react-router-dom';
import { apiUrl } from '../../../utils/variables';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid var(--azul)',
  boxShadow: 24,
  p: 4,
};

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const urlShare = `${apiUrl}`;
  return (
    <>
      <Outlet />
      {/* footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
} */}
      <footer>
        <div
          className="containerFooter"
          style={{
            width: '100%',
            backgroundColor: '#004AAD',
            display: 'flex',
            justifyContent: 'space-betwen',
            bottom: '0',
            position: 'fixed',
          }}
        >
          <a href="">
            <img
              src={logoNav}
              alt=""
              style={{
                display: 'flex',
                width: '220px',
                height: '60px',
              }}
            />
          </a>
          <p className="Copy"> &copy; 2023 Digital Booking </p>

          <button id="compartirHome" onClick={handleOpen}>
            <img
              src={compartir}
              alt=""
              style={{ width: '40px', height: '40px' }}
            />
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <img src={logoNav} width="100%"></img>
                <p>
                  Reserva la atención para tu auto en los mejores talleres de
                  mecánica automotriz de la ciudad.
                </p>
                <p>
                  Tecniautos es una plataforma intuitiva y amigable que te
                  permitirá optimizar el tiempo y tener una experiencia de
                  reserva <strong>práctica y eficiente</strong>.
                </p>

                <p></p>
              </Typography>
              <div className="share">
                <FacebookShareButton url={urlShare}>
                  <FacebookIcon class="redes"></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url={urlShare}>
                  <TwitterIcon class="redes"></TwitterIcon>
                </TwitterShareButton>
              </div>
            </Box>
          </Modal>
        </div>
      </footer>
    </>
  );
};

export default Footer;
