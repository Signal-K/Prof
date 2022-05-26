import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import Loading from "./loading";
import { IonPhaser } from '@ion-phaser/react'
import Phaser from 'phaser';

const game = {
  width: '100%',
  height: '100%',
  type: Phaser.AUTO,
  scene: {
    init: function() {
      this.cameras.main.setBackgroundColor('#24252A');
    },
    create: function() {
      this.helloWorld = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "Hello World", {
          font: "40px Arial",
          fill: "#ffffff"
        }
      );
      this.helloWorld.setOrigin(0.5);
    },
    update: function() {
      this.helloWorld.angle += 1;
    }
  }
}

const Profile = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user.issuer && history.push("/login");
  }, [user, history]);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className="label">Email</div>
            <div className="profile-info">{user.email}</div>

            <a href="https://dao.emulsion.space"><div className="label">User Id</div></a>
            <div className="profile-info">{user.issuer}</div>

            <IonPhaser game={game} />
          </>
        )
      )}
      <style>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;
