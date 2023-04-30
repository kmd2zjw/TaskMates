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

export const getUsers = (req, res) => {
  const q = 
    "SELECT userID, firstName, lastName FROM in_group NATURAL JOIN users WHERE groupID = ?";

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });

};