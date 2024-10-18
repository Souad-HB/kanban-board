import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    // get the authorization header from the request
    const authHeader = req.headers.authorization;
    // check if the authorization header exists
    if (authHeader) {
        // extract the token form the authorization header
        const token = authHeader.split(" ")[1];
        // get the secret key from the env
        const secretKey = process.env.JWT_SECRET_KEY || "";
        // verify the JWT token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Send forbidden status if the token is inavlid
            }
            req.user = user;
            return next(); // call the next middleware function
        });
    }
};
