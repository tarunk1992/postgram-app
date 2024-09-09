import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaRegComment } from "react-icons/fa6";


export default function CommentPopup({ id, item, data, setData }) {
  const [show, setShow] = useState(false);
  const [cmt, setCmt] = useState("");
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json()) // Properly return res.json()
      .then((result) => {
        console.log(result);

        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
        setCmt("");
      })
      .catch((err) => {
        console.error("Error unliking post:", err);
      });
  };

  const commentToggle = () => {
    setShow(!show);
  };
  return (
    <div className="commentPopup">
      <FaRegComment onClick={() => setShow(true)} />
      <span className="span">{item.comments.length} comments </span>

      <Modal
        show={show}
        dialogClassName="modal-90w"
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body id="example-custom-modal-styling-title">
          {item.comments.map((record) => {
            return (
              <div className="comments">
                <p key={record._id}> {record.text} </p>
                <span key={record._id}>~{record.postedBy.name}</span>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, item._id);
              }}
            >
              <input
                value={cmt}
                onChange={(e) => setCmt(e.target.value)}
                type="text"
                placeholder="Add a comment"
              ></input>
            </form>
          </div>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

   
    </div>
  );
}
