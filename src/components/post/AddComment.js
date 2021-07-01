import {useState, useContext} from 'react'
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const AddComment = ({docId, comments, setComments, commentInput}) => {
    const [comment,setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        //This will only update our local comments array
        setComments([...comments, { displayName, comment }]);
        setComment('');
        //This will update firebase comment array that is in photos -> docId -> comments
        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            })
    }

    return (
        <div className="border-t border-gray-primary">
            <form 
                method="POST" 
                onSubmit={(e) => comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault() } 
                className="flex justify-between pl-0 pr-5">
                <input 
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add Comment"
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disable={comment.length < 1}
                    onClick={handleSubmitComment}
                >Post</button>
            </form>
        </div>
    )
}

export default AddComment

AddComment.propTypes = {
    docId: PropTypes.string.isRequired, 
    comments: PropTypes.array.isRequired, 
    setComments: PropTypes.func.isRequired, 
    commentInput: PropTypes.object.isRequired
}