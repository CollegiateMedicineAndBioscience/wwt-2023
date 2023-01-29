async function GetUser(req, res) {
    const { user } = req;

    // Filter out things that shouldn't be sent to the frontend
    const { salt, password, ...rest } = user;

    return res.send({ user: rest });
}

module.exports = GetUser;
