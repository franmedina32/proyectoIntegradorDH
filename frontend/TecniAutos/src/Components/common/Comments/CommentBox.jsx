import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

const CommentBox = ({ onClickSendComment }) => {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState(null);
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTextValue('');
    onClickSendComment(textValue);
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <FormControl>
        <Textarea
          placeholder="Cuéntanos tu experiencia, añade tu comentario aquí..."
          minRows={3}
          value={textValue}
          onChange={handleTextChange}
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                gap: 'var(--Textarea-paddingBlock)',
                pt: 'var(--Textarea-paddingBlock)',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
              }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ '--ListItemDecorator-size': '24px' }}
              >
                {['200', 'normal', 'bold'].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === '200' ? 'lighter' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}
              >
                <FormatItalic />
              </IconButton>
              <Button type="submit" sx={{ ml: 'auto' }}>
                Send
              </Button>
            </Box>
          }
          sx={{
            margin: '0 10px',
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? 'italic' : 'initial',
          }}
        />
      </FormControl>
    </form>
  );
};

CommentBox.propTypes = {
  onClickSendComment: PropTypes.func.isRequired,
};

export default CommentBox;
