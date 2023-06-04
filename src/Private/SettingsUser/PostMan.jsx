import React, { useContext } from "react";
import { Context } from "../../Settings";
import { MyPost } from "./MyPost";

export const PostMan = ({
  title,
  body,
  avtor,
  handleGetPosts,
  user_id,
  id,
  postsAll
}) => {
    const {user} = useContext(Context)
    return (
    <div className="post">
      <h3>{title}</h3>
      <h4>{body}</h4>
      <h5>
        {avtor.split(" ")[0]}.{avtor.split(" ")[1][0]}
      </h5>
      {(function () {
        if (user.id === user_id && postsAll === false) {
          return (
            <React.Fragment>
              <MyPost
                post_id={id}
                handleGetPosts={handleGetPosts}
                id={user.id}
              />
            </React.Fragment>
          );
        } else  if(user.id === user_id){
            return(
                <p style={{padding: "1rem 0rem"}}>Bu sizning postingiz</p>
            )
        }else{
            return false
        }
      })()}
    </div>
  );
};
