import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const createOrg = (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const createOrgQuery =
        "INSERT INTO organization(`groupName`) VALUES (?)";
  
      const values = [
        req.body.name,
      ];
      const v1 = [
        req.body.userID,
      ];
      const addUserToGroupQuery = "INSERT INTO in_group(`userID`, `groupID`) VALUES (?)";
      const findGroupIDQuery = "SELECT groupID from organization where groupName = ?";

      const isAdminQuery = "SELECT adminID FROM make_admin WHERE userID = ?";
      const createAdminQuery = "INSERT INTO make_admin(`userID`) VALUES (?)";

      const makeOrgAdminQuery = "INSERT INTO administrates_group(`adminID`, `groupID`) VALUES (?)";

      //Creates organization
      db.query(createOrgQuery, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        //Finds groupID
        db.query(findGroupIDQuery, [values], (err1, data1) => {
          if (err1) return res.status(500).json(err1);
          console.log(data1[0].groupID);
          const inGroup = [
              req.body.userID,
              data1[0].groupID,
          ];
          //Adds user to Group
          db.query(addUserToGroupQuery, [inGroup], (err2, data2) => {
              if (err2) return res.status(500).json(err2);
          });
          //Checking if user already has an adminID
          db.query(isAdminQuery, [req.body.userID], (err3, data3) => {
              if (err3) return res.status(500).json(err3);
              if (data3.length) {
                  const adminID = data3[0].adminID;
                  //Making user admin of the group
                  const makeAdmin = [
                      adminID,
                      data1[0].groupID,
                  ]
                  db.query(makeOrgAdminQuery, [makeAdmin], (error, d) => {
                      if (error) return res.status(500).json;
                  });
              } else {
                  //create Admin
                  db.query(createAdminQuery, [req.body.userID], (err4, data4) => {
                      if (err4) return res.status(500).json(err4);
                  })
                  //get AdminID
                  db.query(isAdminQuery, [req.body.userID], (err5, data5) => {
                      if (err5) return res.status(500).json(err5);
                      const adminID = data5[0].adminID;
                      // Making user admin of the group
                      const makeAdmin = [
                          adminID,
                          data1[0].groupID,
                      ]
                      db.query(makeOrgAdminQuery, [makeAdmin], (error, d) => {
                          if (error) return res.status(500).json;
                      });
              });
            }
          });
          
        })
        return res.json("Page has been created.");
      });

    });
  };

export const viewOrgs = (req, res) =>{
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q1 = "SELECT groupID, groupName FROM in_group NATURAL JOIN organization WHERE userID = ?";
    db.query(q1, [userInfo.id], (err,data)=>{
        if(err) return res.send(err);
        return res.status(200).json(data);
        
    });
  });
    
}

export const getOrg = (req, res) => {
  const q =
    "SELECT * FROM organization WHERE groupID = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addUserToGroup = (req, res) => {
  const vals = [
    req.body.userAdd,
    req.body.orgId,
  ];
  const q = 
    "INSERT INTO in_group(`userID`, `groupID`) VALUES (?)";
    
    db.query(q, [vals], (err, data) => {

      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
};

export const getOrgUsers = (req, res) => {
  const q = "SELECT userID, first_name, last_name, adminID FROM in_group NATURAL JOIN user WHERE groupID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const makeAdmin = (req, res) => {
  console.log(req.body)
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const getUser = "SELECT a.userID, b.adminID FROM user a left JOIN make_admin b on a.userID = b.userID WHERE a.userID = ? ";
    const getAdminId = "SELECT b.adminID FROM user a left JOIN make_admin b on a.userID = b.userID WHERE a.userID = ? ";
    const checkAdministratesGroup = "SELECT * FROM administrates_group WHERE adminID = ? AND groupID = ?";
    console.log(req.body.userID)
    db.query(getUser, [req.body.userID], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log("here", data[0].adminID)
      if (!data[0].adminID) return res.status(401).json("Not authenticated!");
      let temp = -1
      db.query(getAdminId, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        temp = data[0].adminID
      })
      console.log(temp)
      db.query(checkAdministratesGroup, [temp, req.body.groupID], (err2, data2) => {
        if (err2) return res.status(500).json(err2);
        if (data2.length == null) {
          return res.status(401).json("Not authenticated!");
        }
        console.log("here", data2)
        const makeAdmin = "SET @adminID=?; SET @newUserID=?; CALL grantAdmin(@adminID,@newUserID)"
        db.query(makeAdmin, [data[0].adminID, req.body.groupID], (err3, data3) => {
          console.log(err3)
          if (err3) return res.status(500).json(err3);
          return res.status(200)
        });
      });
    });
  });
};