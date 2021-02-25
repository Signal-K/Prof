import React from "react";
import "./style.css";

function App() {
  return <DashboardHome {...DashboardHomeData} />;
}

export default App;


function DashboardHome(props) {
  const {
    menuDividerRight,
    vector,
    vector2,
    vector3,
    vector4,
    dashboard,
    courses,
    account,
    settings,
    group3,
    ellipse1,
    ellipse2,
    ellipse3,
    avatarBg,
    ellipse,
    phpDevAndWriter,
    name,
    avatarDivider,
    courseName,
    title,
    text1,
    bxbxsuserrectangleProps,
    bxbxsuserrectangle2Props,
  } = props;

  return (
    <div className="dashboard-home">
      <div className="overlap-group">
        <Bxbxsuserrectangle vector={bxbxsuserrectangleProps.vector} />
        <div className="nav">
          <div className="overlap-group1">
            <img className="menu-divider-right" src={menuDividerRight} />
            <div className="rectangle-1"></div>
            <div className="group-1">
              <div className="auto-flex1">
                <div className="icbaseline-dashboard">
                  <img className="vector-1" src={vector} />
                </div>
                <div className="wpfbooks">
                  <img className="vector-2" src={vector2} />
                </div>
                <Bxbxsuserrectangle vector={bxbxsuserrectangle2Props.vector} className="bxbxs-user" />
                <div className="evasettings-2-fill">
                  <div className="overlap-group2">
                    <img className="vector-3" src={vector3} />
                    <img className="vector-4" src={vector4} />
                  </div>
                </div>
              </div>
              <div className="auto-flex">
                <div className="auto-flex-item valign-text-middle notosansjp-medium-black-14px">{dashboard}</div>
                <div className="auto-flex-item valign-text-middle notosansjp-medium-black-14px">{courses}</div>
                <div className="auto-flex-item valign-text-middle notosansjp-medium-black-14px">{account}</div>
                <div className="auto-flex-item valign-text-middle notosansjp-medium-black-14px">{settings}</div>
              </div>
            </div>
            <div className="group-3" style={{ backgroundImage: `url(${group3})` }}>
              <div className="nav-menu">
                <img className="ellipse-1" src={ellipse1} />
                <img className="ellipse-" src={ellipse2} />
                <img className="ellipse-" src={ellipse3} />
              </div>
              <div className="group-2">
                <div className="overlap-group2-1">
                  <img className="avatar-bg" src={avatarBg} />
                  <img className="ellipse animate-enter" src={ellipse} />
                </div>
              </div>
            </div>
            <div className="php-dev-and-writer notosansjp-bold-black-12px">{phpDevAndWriter}</div>
            <div className="name notosansjp-normal-gravel-18px">{name}</div>
            <img className="avatar-divider" src={avatarDivider} />
          </div>
        </div>
      </div>
      <div className="text">
        <h1 className="course-name valign-text-middle notosansjp-bold-chicago-32px">{courseName}</h1>
        <div className="title valign-text-middle notosansjp-bold-chicago-24px">{title}</div>
        <div className="text-1 notosansjp-normal-chicago-18px">{text1}</div>
      </div>
    </div>
  );
}


function Bxbxsuserrectangle(props) {
  const { vector, className } = props;

  return (
    <div className={`bxbxs-user-rectangle ${className || ""}`}>
      <img className="vector" src={vector} />
    </div>
  );
}
const bxbxsuserrectangleData = {
    vector: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/6034a28d28d51b57ae00fc50/img/vector@2x.svg",
};

const bxbxsuserrectangle2Data = {
    vector: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/vector-2@2x.svg",
};

const DashboardHomeData = {
    menuDividerRight: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/menu-divider-right@1x.svg",
    vector: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/vector@2x.svg",
    vector2: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/6034a28d28d51b57ae00fc50/img/vector-2@2x.svg",
    vector3: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/vector-3@2x.svg",
    vector4: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/6034a28d28d51b57ae00fc50/img/vector-5@2x.svg",
    dashboard: "Dashboard",
    courses: "Courses",
    account: "Account",
    settings: "Settings",
    group3: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/user-avatar-bg@2x.svg",
    ellipse1: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/ellipse-1@2x.svg",
    ellipse2: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/ellipse-1@2x.svg",
    ellipse3: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/ellipse-1@2x.svg",
    avatarBg: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/avatar-bg@2x.svg",
    ellipse: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/6033843c254106bb236e6181/img/ellipse@2x.svg",
    phpDevAndWriter: "PHP dev and writer",
    name: "John Jones",
    avatarDivider: "https://anima-uploads.s3.amazonaws.com/projects/603378ce329c7b99b7b85ee0/releases/603378e4fc3aec52973e709b/img/avatar-divider@2x.svg",
    courseName: "Course Name",
    title: "Title",
    text1: "<>Tellus quam eget velit in volutpat diam ligula elementum vehicula. Tempus convallis eget enim sit. Elementum volutpat dui ac magnis faucibus gravida. Sagittis orci, scelerisque libero proin sed quam pulvinar enim tortor. Egestas tincidunt ultrices sed tincidunt. Laoreet a, amet, sed mattis. Imperdiet vitae, nisi odio ac accumsan. Auctor fermentum ac tincidunt nibh pulvinar tempor vitae placerat. Egestas nunc non varius netus gravida auctor netus ipsum.<br/>Tellus dictum enim mi in dignissim sodales eu. At nulla massa leo hac. Porta neque, donec pharetra nec. Amet ultricies diam, adipiscing ornare pulvinar tincidunt nec non donec. Ornare accumsan, consectetur sed nunc, eleifend. Sed enim id a ac iaculis nulla mattis metus ac. Cras tristique purus lorem bibendum. Arcu tortor netus libero feugiat sed sit mollis vel aliquam. Gravida ac gravida consectetur nibh fermentum laoreet. Massa mi, amet feugiat netus euismod pharetra, blandit faucibus. Ultrices sagittis, interdum diam viverra magna at sem sed orci. Urna, nisi, enim euismod nibh ultricies. Tempus praesent eros, sed pellentesque nulla ut in sed. Massa consequat purus ut et netus laoreet varius. Iaculis phasellus varius arcu malesuada tellus adipiscing tortor.</>",
    bxbxsuserrectangleProps: bxbxsuserrectangleData,
    bxbxsuserrectangle2Props: bxbxsuserrectangle2Data,
};

