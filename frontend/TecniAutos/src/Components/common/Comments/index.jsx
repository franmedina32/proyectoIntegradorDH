import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { apiUrl } from '../../../utils/variables';
import CommentBox from './CommentBox';
import CommentsList from './CommentsList';
import './comments.css';

const Comments = ({ tallerId, emailUsuario }) => {
  const urlPost = `${apiUrl}/comentarios/registro`;
  const urlGet = `${apiUrl}/comentarios/taller/id/${tallerId}`;
  const [reloadCommentsList, setReloadCommentsList] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetch(urlGet)
      .then((res) => res.json())
      .then((data) => setCommentsList(data));
  }, [reloadCommentsList]);

  const handleSendComment = (textoComentario) => {
    fetch(urlPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textoComentario, emailUsuario, tallerId }),
    }).then(() =>
      setReloadCommentsList((reloadCommentsList) => !reloadCommentsList),
    );
  };

  return (
    <div className="comments-container">
      <h2>Comentarios</h2>
      <CommentBox onClickSendComment={handleSendComment} />
      <CommentsList comments={commentsList} />
    </div>
  );
};

Comments.propTypes = {
  tallerId: PropTypes.number.isRequired,
  emailUsuario: PropTypes.string.isRequired,
};

export default Comments;
