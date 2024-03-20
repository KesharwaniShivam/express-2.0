1. we use GET request for LOGOUT , because we dont want somthing , we only have to remove the TOKEN 

2. next in (req, res , next) ---  we can provide as many handler(handler is nothing but a FUNCTION /(req,res)=>{})
                                  as we want

                                  so to move to next handler we give next();
                                  If one handler is completed then it goes to next and so on (if next() is provided)

3. For encoding we'll use jsonwebtoken jwt 

4. Using "bcrypt" for hashing password 