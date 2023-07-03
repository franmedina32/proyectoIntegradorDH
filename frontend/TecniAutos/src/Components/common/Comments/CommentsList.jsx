import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const CommentsList = ({ comments = [] }) => {
  return (
    !!comments.length && (
      <div style={{ height: '200px', overflow: 'auto' }}>
        <List sx={{ width: '100%' }}>
          {comments.map(
            (
              { usuarioNombre, usuarioApellido, textoComentario },
              index,
              array,
            ) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={`${usuarioNombre} ${usuarioApellido}`}
                      src="#"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ color: 'black' }}
                    primary={textoComentario}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {`-- ${usuarioNombre} ${usuarioApellido}`}
                      </Typography>
                    }
                  />
                </ListItem>
                {index !== array.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </>
            ),
          )}
        </List>
      </div>
    )
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
