import {db} from "../db.js"

export const createOrg = (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO organizations(`organizationName`) VALUES (?)";
  
      const values = [
        req.body.name,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Page has been created.");
      });
    });
  };
export const viewOrgs = (req, res) =>{
    const q = "SELECT * FROM organization";
    db.query(q, (err,data)=>{
        if(err) return res.send(err);
        return res.status(200).json(data);
    });
}