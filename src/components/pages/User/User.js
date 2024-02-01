import React, { useEffect, useState } from "react";
import "./User.css";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import Repo from "../../ui/Repo";

function User() {
  const { login } = useParams();

  //User infirmation
  const [userInfo, setUserInfo] = useState({});
  // user repos
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/users/${login}`),
          axios.get(`/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data)
        setRepos(response[1].data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsersInfo();
  }, []);

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-inform">
        <div className="image">
          <img src={userInfo?.avatar_url} alt="User"></img>
        </div>
        <div className="user-content">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.bio}</p>
          <div className="more-data">
            <p>
              <img src={user} alt="User"></img>
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <img src={location} alt="Location"></img>
                {userInfo?.location}
              </p>
            )}
   { userInfo?.blog &&        <p>
              <img src={site} alt="Portfolio"></img>
              {userInfo?.blog}
            </p>}
            <p>
              <img src={github} alt="Github"></img>
              <a href={userInfo?.html_url}>View Github</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repo">
        {repos ? repos.map(repo => {
           return <Repo repo={repo} key={repo.id} />
        }) : <h2>No repos for this user...</h2>
        }
      </div>
    </div>
  );
}

export default User;
